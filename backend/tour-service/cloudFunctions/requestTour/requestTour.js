const { PubSub } = require('@google-cloud/pubsub')
const aws = require('aws-sdk')
const axios = require('axios')

aws.config.loadFromPath('./config.json')

const pubsub = new PubSub()
const dynamodb = new aws.DynamoDB.DocumentClient()

const EMAIL_SERVICE_TOPIC = 'EmailService'

const formatTourPackages = ({ name, price, destination }) => {
  return `

    <h3>Here is the recommended tour package for you</h3>

    <p>
      <strong>Name:  ${name}
    </p>
    <p>
      <strong>Destination: ${destination}
    </p>
    <p>
      <strong>Price: CAD ${price}
    </p>
  `
}

const getTourPackageDetails = async (id) => {
  const params = {
    Key: {
      name: id,
    },
    TableName: 'tourPackages',
  }
  const res = await dynamodb.get(params).promise()
  return res
}

const getMostPreferredTour = (tourPackages) => {
  let maxScore = -1
  let mostPreferredTourPackageID = null
  for (const [packageId, score] of Object.entries(tourPackages)) {
    if (score > maxScore) {
      maxScore = score
      mostPreferredTourPackageID = packageId
    }
  }
  return mostPreferredTourPackageID
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
    try {
      const mostPreferredTourID = getMostPreferredTour(tourPackages)
      const { Item } = await getTourPackageDetails(mostPreferredTourID)

      console.log('Recommended tour: ', Item)

      const message = {
        recipient: recipientEmail,
        body: formatTourPackages(Item),
      }

      const messageBuffer = Buffer.from(JSON.stringify(message))

      await pubsub
        .topic(EMAIL_SERVICE_TOPIC)
        .publishMessage({ data: messageBuffer })

      console.log(
        `Email with package details sent to ${recipientEmail} successfully`
      )

      return res.json({ success: true, tourPackage: Item })
    } catch (err) {
      console.error(err)
      return res.json({ success: false, message: err.message })
    }
  } else res.json({ success, message: tourPredictionMessage })
}
