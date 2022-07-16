const { PubSub } = require('@google-cloud/pubsub')

const pubsub = new PubSub()

const EMAIL_SERVICE_TOPIC = 'EmailService'

exports.requestTour = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')
  const { stayDuration } = req.body

  if (!stayDuration)
    return res.json({ success: false, message: 'Stay duration is required' })

  const message = {
    recipient: 'saichand.kolloju@gmail.com',
    body: stayDuration,
  }

  const messageBuffer = Buffer.from(JSON.stringify(message))

  try {
    await pubsub
      .topic(EMAIL_SERVICE_TOPIC)
      .publishMessage({ data: messageBuffer })
  } catch (err) {
    console.error(err)
    return res.json({ success: false, message: err.message })
  }

  res.json({ success: true, tourPackages: [] })
}
