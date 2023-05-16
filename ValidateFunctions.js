const { ObjectId } = require('mongodb')
const connectToDb = require('./DatabaseServer')

async function validCategory(paramCategory) {
    const collection = await connectToDb()
    const allCategories = await collection.distinct('category', collection.find({}).toArray())
    if(!allCategories.includes(paramCategory)) {
        return false
    } else {
        return true
    }
}

async function validCharacter(paramCharacter) {
    const collection = await connectToDb()
    const allCharacters = await collection.distinct('character', collection.find({}).toArray())
    if(!allCharacters.includes(paramCharacter)) {
        return false
    } else {
        return true
    }
}

function validateId(paramId) {
    try {
        return true
    } catch {
        return false
    }
}

module.exports = {
    validCategory,
    validCharacter,
    validateId
}
