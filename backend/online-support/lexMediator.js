const AWS = require("aws-sdk");
var lexruntime = new AWS.LexRuntime();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event["body"]);
    const message = body["message"];

    var params = {
      botAlias: "Hotel",
      botName: "Hotel",
      inputText: message,
      userId: "AWSServiceRoleForLexBots",
    };

    let res = await lexruntime.postText(params).promise();
    return res;
  } catch (err) {
    return {
      statusCode: 500,
      body: "Something went wrong",
    };
  }
};
