const { getAllProducts, getProductById } = require('./RobotController')

function Router(app) {

    app.get('/products', getAllProducts)

    app.get('/products/:id', getProductById)
    
}

module.exports = Router