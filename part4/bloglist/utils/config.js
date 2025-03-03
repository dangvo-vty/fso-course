require('dotenv').config()

let PORT = process.env.PORT
const MONGO = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB : process.env.MONGODB

module.exports = {PORT, MONGO}