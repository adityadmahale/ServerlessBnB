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
    return {
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "PlainText",
          content:
            data["Item"]["available"] +
            " " +
            roomType +
            " rooms are available - Price: $" +
            data["Item"]["price"],
        },
      },
    };
  } catch (err) {
    return err;
  }
};
