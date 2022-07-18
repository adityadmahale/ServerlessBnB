const dynamoose = require("dynamoose");
const Joi = require("joi");

const Booking = dynamoose.model(
  "Booking",
  new dynamoose.Schema({
    customerID: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  })
);

module.exports.validate = (object) => {
  const schema = Joi.object({
    customerID: Joi.string().required(),
    type: Joi.string().min(3).max(100).required(),
    active: Joi.boolean().required(),
  });

  return schema.validate(object);
};

module.exports.Booking = Booking;
