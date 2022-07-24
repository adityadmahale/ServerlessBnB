const axios = require('axios')
const { Storage } = require('@google-cloud/storage')
const { EOL } = require('os')

const storage = new Storage()

const VISUALIZATIONS_BUCKET = 'serverlessbnb-visualizations'
const ROOMS_BOOKINGS_BASEURL =
  'https://xqet4nlofotprm2yiiz6rvrcm40giliq.lambda-url.us-east-1.on.aws'

const ORDERS_ENDPOINT =
  'https://kitchen-service-kc2rqvhqga-uc.a.run.app/getOrders'

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
  const targetFile = await storage.bucket(bucketName).file(targetFileName)
  // Citation: https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
  // The following line of code is written by referring to the source cited above
  const fileStream = await targetFile.createWriteStream()
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

async function uploadBookingsCSVToBucket(bookings) {
  const csvStrings = []

  const activeBookingsFrequencyMap = new Map()

  for (const booking of bookings) {
    const { type, active } = booking

    if (activeBookingsFrequencyMap.has(type)) {
      if (active) {
        activeBookingsFrequencyMap.set(
          type,
          activeBookingsFrequencyMap.get(type) + 1
        )
      }
    } else {
      if (active) {
        activeBookingsFrequencyMap.set(type, 1)
      } else {
        activeBookingsFrequencyMap.set(type, 0)
        console.log(`Setting ${type} to 0`)
      }
    }
  }

  const activeBookingsFrequencyObject = Object.fromEntries(
    activeBookingsFrequencyMap
  )

  for (const [type, activeBookingsCount] of Object.entries(
    activeBookingsFrequencyObject
  )) {
    const csvString = `${type},${activeBookingsCount}${EOL}`
    csvStrings.push(csvString)
  }

  await uploadCSVToBucket(
    VISUALIZATIONS_BUCKET,
    'bookings.csv',
    csvStrings,
    `Room Type,Active Bookings${EOL}`
  )
}

async function uploadOrdersCSVToBucket(orders) {
  const csvStrings = []

  const ordersFrequencyMap = new Map()

  for (const _order of orders) {
    const { order } = _order

    if (ordersFrequencyMap.has(order)) {
      ordersFrequencyMap.set(order, ordersFrequencyMap.get(order) + 1)
    } else {
      ordersFrequencyMap.set(order, 1)
    }
  }

  const ordersFrequencyObject = Object.fromEntries(ordersFrequencyMap)

  for (const [item, count] of Object.entries(ordersFrequencyObject)) {
    const csvString = `${item},${count}${EOL}`
    csvStrings.push(csvString)
  }

  await uploadCSVToBucket(
    VISUALIZATIONS_BUCKET,
    'orders.csv',
    csvStrings,
    `Item,Number of orders${EOL}`
  )
}

exports.generateVisualizations = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')

  try {
    const {
      data: { orders },
    } = await axios.get(`${ORDERS_ENDPOINT}`)
    const { data: rooms } = await axios.get(`${ROOMS_BOOKINGS_BASEURL}/rooms`)
    const { data: bookings } = await axios.get(
      `${ROOMS_BOOKINGS_BASEURL}/bookings`
    )

    await uploadRoomsCSVToBucket(rooms)
    await uploadBookingsCSVToBucket(bookings)
    await uploadOrdersCSVToBucket(orders)
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}
