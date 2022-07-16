import { PubSub } from '@google-cloud/pubsub'

const topicName = 'TourService'

const pubSubClient = new PubSub({ keyFilename: 'gcp_credentials.json' })

async function publishMessage() {
  //   const dataBuffer = Buffer.from('yoo from react')

  try {
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: 'yoo from react' })
    console.log(`Message ${messageId} published.`)
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`)
    process.exitCode = 1
  }
}

export default publishMessage()``
