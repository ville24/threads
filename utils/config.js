require('dotenv').config()

let PORT = process.env.PORT
let RSS_BASE_URL = process.env.RSS_BASE_URL

module.exports = { 
    PORT,
    RSS_BASE_URL
}