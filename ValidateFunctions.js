const connectToDb = require('./DatabaseService')

async function validCategory(paramCategoryArray) {
    const collection = await connectToDb()
    const allCategories = await collection.distinct('category', collection.find({}).toArray())
    paramCategoryArray?.forEach((param) => {
        if(allCategories.includes(param)) {
            return true
        } 
    })
}

async function validCharacter(paramCharacterArray) {
    const collection = await connectToDb()
    const allCharacters = await collection.distinct('character', collection.find({}).toArray())
    paramCharacterArray?.forEach((param) => {
        if(allCharacters.includes(param)) {
            return true
        } 
    })
}

module.exports = {
    validCategory,
    validCharacter
}
