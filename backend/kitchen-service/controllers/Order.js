const { sendMessage } = require("../pubsub/pubsub");
const topicID = "order-topic";
const Firestore = require("@google-cloud/firestore");
// Use your project ID here
const PROJECTID = "hotel-management-serverless";
const COLLECTION_NAME = "orders";
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});
const defaultMealPrice = 100;

const placeOrder = async (req, res) => {
  console.log(req.body);
  const { customerId, order } = req.body;
  const message = JSON.stringify({
    customerID: customerId,
    order: order,
    mealPrice: defaultMealPrice,
    createdDate: new Date(),
  });
  const messageId = await sendMessage(topicID, message);
  return res.status(200).json({
    success: true,
    message: `Message ${messageId} published :)`,
  });
};

const getOrdersByCustomer = async (req, res) => {
  console.log(req.query);
  let { customerId, startDate, endDate } = req.query;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const ordersRef = firestore.collection(COLLECTION_NAME);
  const snapshot = await ordersRef.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return res.status(404);
  }
  let orders = 0;
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    const createdDate = new Date(doc.data().createdDate);
    console.log(createdDate.getFullYear());
    if (
      createdDate.getDate() >= startDate.getDate() &&
      createdDate.getDate() <= endDate.getDate() &&
      createdDate.getFullYear() >= startDate.getFullYear() &&
      createdDate.getFullYear() <= endDate.getFullYear()
    ) {
      console.log(doc.id + " selected.");
      orders++;
    }
  });
  return res.status(200).json({
    success: true,
    orders: orders,
    message: `Total orders by the customer ${customerId} : ${orders}`,
  });
};
module.exports = { placeOrder, getOrdersByCustomer };
