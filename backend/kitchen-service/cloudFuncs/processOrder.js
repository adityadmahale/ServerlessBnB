/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, "base64").toString()
    : "Hello, World";
  console.log(message);

  const retrievedMessage = JSON.parse(message);
  console.log("New message: " + retrievedMessage);
  const Firestore = require("@google-cloud/firestore");
  // Use your project ID here
  const PROJECTID = "hotel-management-serverless";
  const COLLECTION_NAME = "orders";
  const firestore = new Firestore({
    projectId: PROJECTID,
    timestampsInSnapshots: true,
  });

  return firestore
    .collection(COLLECTION_NAME)
    .add(retrievedMessage)
    .then((doc) => {
      console.info("stored new doc id#", doc.id);
    })
    .catch((err) => {
      console.error(err);
    });
};
