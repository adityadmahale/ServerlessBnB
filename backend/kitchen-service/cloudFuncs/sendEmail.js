/**
 * Author: Udit Gandhi
 * DAL ID: B00889579
 * Email: udit.gandhi@dal.ca
 */
/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

async function sendMail(msg) {
  try {
    console.log("Sending email to ", msg.to);
    await sgMail.send(msg);
  } catch (err) {
    console.log(err.toString());
  }
}

exports.helloFirestore = async (event, context) => {
  const msg = {
    to: event.value.fields.email.stringValue,
    from: "sc529025@dal.ca",
    subject: "Serverless B&B Kitchen",
    text: "Your food order will be delivered in 45 minutes.",
    html: "Your food order will be delivered in 45 minutes",
  };

  sendMail(msg);
};
