/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub();

const sendMessage = async (topicID, message) => {
  const messageBuffer = Buffer.from(message);
  try {
    const messageId = await pubSubClient.topic(topicID).publish(messageBuffer);
    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
};

module.exports = { sendMessage };
