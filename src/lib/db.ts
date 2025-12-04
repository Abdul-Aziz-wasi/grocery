const mongodbUrl = process.env.MONGODB_URL

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is not found")
}

const cached =global.mongoose