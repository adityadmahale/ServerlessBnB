const axios = require('axios')
const { Storage } = require('@google-cloud/storage')
const { EOL } = require('os')

const storage = new Storage()

const VISUALIZATIONS_BUCKET = 'serverlessbnb-visualizations'
const ROOMS_ENDPOINT =
  'https://xqet4nlofotprm2yiiz6rvrcm40giliq.lambda-url.us-east-1.on.aws/rooms'

async function createBucket(bucketName) {
  try {
    // Citation: https://googleapis.dev/nodejs/storage/latest/Bucket.html#exists
    // The following line of code is written by referring to the source cited above
    const [bucketExists] = await storage.bucket(bucketName).exists()

    if (!bucketExists) {
      // Citation: https://googleapis.dev/nodejs/storage/latest/Storage.html#createBucket
      // The following line of code is written by referring to the source cited above
      await storage.createBucket(bucketName)
      console.log(`Bucket "${bucketName}" created successfully`)
    } else {
      console.log('Bucket exists already')
    }
  } catch (err) {
    console.log(err.message)
  }
}

async function uploadCSVToBucket(
  bucketName,
  targetFileName,
  csvStrings,
  csvHeader
) {
  await createBucket(bucketName)
  const trainCSV = await storage.bucket(bucketName).file(targetFileName)
  // Citation: https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
  // The following line of code is written by referring to the source cited above
  const fileStream = await trainCSV.createWriteStream()
  fileStream.write(csvHeader)
  fileStream.write(csvStrings.join(EOL))
  fileStream.end()
}

async function uploadRoomsCSVToBucket(rooms) {
  const csvStrings = rooms.map(
    ({ type, available, price }) => `${type},${available},${price}${EOL}`
  )
  await uploadCSVToBucket(
    VISUALIZATIONS_BUCKET,
    'rooms.csv',
    csvStrings,
    `Room Type,Available Rooms,Price${EOL}`
  )
}

exports.generateCSV = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')

  const { data: rooms } = await axios.get(ROOMS_ENDPOINT)

  uploadRoomsCSVToBucket(rooms)

  res.json({ success: true })
}
