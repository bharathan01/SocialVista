require('dotenv').config()


const mongoDbUrl =
 `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mkw5yw0.mongodb.net/${process.env.DB_NAME}`

module.exports =  mongoDbUrl


 