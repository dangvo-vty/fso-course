require('dotenv').config()

let PORT = process.env.PORT
let MONGO = process.env.MONGODB

module.exports = {PORT, MONGO}