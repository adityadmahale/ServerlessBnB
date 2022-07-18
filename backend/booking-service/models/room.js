const dynamoose = require("dynamoose");
const Joi = require("joi");

const Room = dynamoose.model(
  "Room",
  new dynamoose.Schema({
    type: {
      type: String,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    AirConditioning: {
      type: Boolean,
      required: true,
    },
    DailyHousekeeping: {
      type: Boolean,
      required: true,
    },
    TV: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    DailyHousekeeping: {
      type: Boolean,
      required: true,
    },
    FreeWiFi: {
      type: Boolean,
      required: true,
    },
    Bathroom: {
      type: Boolean,
      required: true,
    },
    Intercom: {
      type: Boolean,
      required: true,
    },
  })
);

module.exports.validateRoom = (object) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    available: Joi.number().required(),
    price: Joi.number().required(),
  });

  return schema.validate(object);
};

module.exports.Room = Room;
