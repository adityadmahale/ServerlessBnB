const { PubSub } = require('@google-cloud/pubsub')
const axios = require('axios')

const pubsub = new PubSub()

const EMAIL_SERVICE_TOPIC = 'EmailService'

const formatTourPackages = (tourPackages) => {
  const { Alpha, Beta, Gamma } = tourPackages

  return `

    <h3>Here are the recommended tour packages for you</h3>

    <p>
      <strong>Alpha Tour - Recommendation score - ${+Alpha * 100}
    </p>
    <p>
      <strong>Beta Tour - Recommendation score - ${+Beta * 100}
    </p>
    <p>
      <strong>Gamma Tour - Recommendation score - ${+Gamma * 100}
    </p>
  
  `
}

exports.requestTour = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')
  const { stayDuration, recipientEmail } = req.body

  if (!stayDuration)
    return res.json({ success: false, message: 'Stay duration is required' })

  if (!recipientEmail)
    return res.json({ success: false, message: 'Recipient email is required' })

  const { data } = await axios.post(
    'https://us-central1-tidy-interface-355301.cloudfunctions.net/sample-funct',
    {
      Names: 'test',
      Duration: String(stayDuration),
    }
  )
  const { success, tourPackages, message: tourPredictionMessage } = data

  if (success) {
    const message = {
      recipient: recipientEmail,
      body: formatTourPackages(tourPackages),
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
    res.json({ success: true, tourPackages })
  } else res.json({ success, message: tourPredictionMessage })
}
