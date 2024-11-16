require('dotenv').config()

const PORT = process.env.PORT
const RSS_BASE_URL = process.env.RSS_BASE_URL

module.exports = {
  PORT,
  RSS_BASE_URL
}
