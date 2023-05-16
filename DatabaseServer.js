const { MongoClient } = require("mongodb")

async function connectToDb() {
    const mongoUrl = 'mongodb://root:password@localhost:27017'

    const connection = await MongoClient.connect(mongoUrl)
	const collection = connection.db('robot-stores-api').collection('products.json')
    return collection
}

module.exports = connectToDb