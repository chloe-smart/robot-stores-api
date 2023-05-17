const { ObjectId } = require("mongodb")
const connectToDb = require('./DatabaseService')
const { validCategory, validCharacter } = require('./ValidateFunctions')

async function getAllProducts(request, response) {

    const collection = await connectToDb()
    const paramCategory = request.query.category
    const paramCharacter = request.query.character

    const paramCategoryArray = paramCategory ? paramCategory.split(',') : paramCategory
    const paramCharacterArray = paramCharacter ? paramCharacter.split(',') : paramCharacter

    if (paramCategory && paramCharacter && validCategory(paramCategoryArray) && validCharacter(paramCharacterArray)) {
        const productByCategoryAndCharacter = await collection.find({ category: { $in: paramCategoryArray }, character: { $in: paramCharacterArray } }).toArray()
        const responseBody = {
            message: 'Successfully found products.',
            data: productByCategoryAndCharacter
        }
        response.json(responseBody)

    } else if (paramCategory && validCategory(paramCategoryArray)) {
        const productByCategory = await collection.find({ category: { $in: paramCategoryArray } }).toArray()
        const responseBody = productByCategory.length < 1 ? {
            message: 'Unknown Category.',
            data: []
        } : 
            {
                message: 'Successfully found products.',
                data: productByCategory
            }
        response.json(responseBody) 

    } else if (paramCharacter && validCharacter(paramCharacterArray)) {
        const productByCharacter = await collection.find({ character: { $in: paramCharacterArray } }).toArray()
        const responseBody = productByCharacter.length < 1 ? {
            message: 'Unknown character.',
            data: []
        } : 
            {
                message: 'Successfully found products.',
                data: productByCharacter
            }
        response.json(responseBody)

    } else {
        const allProducts = await collection.find({}).toArray()
        const responseBody = {
            message: 'Successfully retrieved all products.',
            data: allProducts
        }
        response.json(responseBody)
        
    }
}

async function getProductById(request, response) {
    const collection = await connectToDb()
    const paramId = request.params.id

        const paramObjectId = new ObjectId(paramId)
        const productById = await collection.findOne({ _id: paramObjectId })
        const responseBody = productById ? {
            message: 'Successfully found products.',
            data: productById
        } : 
            {
                message: 'Invalid Id',
                data: []
            }
        response.json(responseBody)
}

module.exports = {
    getAllProducts,
    getProductById
}