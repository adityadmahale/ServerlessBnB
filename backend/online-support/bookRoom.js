const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // TODO implement
  const roomType = event["inputTranscript"];
  const params = {
    TableName: "Room",
    Key: {
      type: roomType,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    const availability = data["Item"]["available"];

    if (availability === 0) {
      return {
        dialogAction: {
          type: "Close",
          fulfillmentState: "Failed",
          message: {
            contentType: "PlainText",
            content: "Room is not available",
          },
        },
      };
    }

    // Decrease room availability by 1
    const putParams = {
      TableName: "Room",
      Item: {
        ...data["Item"],
        available: availability - 1,
      },
    };
    await docClient.put(putParams).promise();

    return {
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content: roomType + " room booked",
        },
      },
    };
  } catch (err) {
    return err;
  }
};
