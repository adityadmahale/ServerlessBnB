// This file is responsible for emailing tour packages to the customers

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(
  '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'
)

async function sendMail(msg) {
  try {
    console.log('Sending email to ', msg.to)
    await sgMail.send(msg)
  } catch (err) {
    console.log(err.toString())
  }
}

exports.emailSender = async (message, context) => {
  const emailDetails = message.data
    ? JSON.parse(Buffer.from(message.data, 'base64').toString())
    : {}

  const msg = {
    to: emailDetails?.recipient,
    from: 'sc529025@dal.ca',
    subject: 'Tour Package Details',
    text: 'This is your tailored tour package',
    html: emailDetails?.body,
  }

  sendMail(msg)
}
