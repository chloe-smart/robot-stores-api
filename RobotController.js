const { ObjectId } = require("mongodb")
const connectToDb = require('./DatabaseServer')
const { validCategory, validCharacter, validateId } = require('./ValidateFunctions')

async function getAllProducts(request, response) {
    const collection = await connectToDb()
    const paramCategory = request.query.category
    const paramCharacter = request.query.character

    if (paramCategory && validCategory(paramCategory)) {
        const paramCategoryArray = paramCategory.split(',')
        const productByCategory = await collection.find({ category: {$in: paramCategoryArray }}).toArray()
        const responseBody = {
            message: 'Successfully found products.',
            data: productByCategory
        }
        response.json(responseBody)

    } else if (paramCharacter && validCharacter(paramCharacter)) {
        const paramCharacterArray = paramCharacter.split(',')
        const productByCharacter = await collection.find({ character: {$in: paramCharacterArray }}).toArray()
        const responseBody = {
            message: 'Successfully found products.',
            data: productByCharacter
        }
        response.json(responseBody)

    } else if (!validCategory(paramCategory)) {
        const responseBody = {
            message: 'Unknown category',
            'data': []
        }
        response.status(400).json(responseBody)

    } else if (!validCharacter(paramCharacter)) {
        const responseBody = {
            message: 'Unknown character',
            'data': []
        } 
        response.status(400).json(responseBody)

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
    const isIdValid = await validateId(paramId)

    if (!paramId && isIdValid == false) {
        const responseBody = {
            message: 'Invalid Id',
            'data': []
        }
        response.status(400).json(responseBody)  
    } else {
        const paramObjectId = new ObjectId(paramId)
        const productById = await collection.findOne({ _id: paramObjectId })
        const responseBody = productById ? {
            message: 'Successfully found products.',
            data: productById
        } : 
            {
                message: 'Invalid Id',
                'data': []
            }
        response.json(responseBody)     
    }           
}

module.exports = {
    getAllProducts,
    getProductById
}