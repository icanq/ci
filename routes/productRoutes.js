const products = require('express').Router()
const productController = require('../controllers/productController')
const authorize = require('../middlewares/authorization')
const authentication = require("../middlewares/authentication")

//test
// products.get('/', (req, res) => {
//   res.send('ok')
// })

//crud
products.get('/', productController.get)

products.use(authentication)
products.post('/', authorize, productController.create)
products.get('/:id', authorize, productController.getById)
products.put('/:id', authorize, productController.update)
products.delete('/:id', authorize, productController.delete)

module.exports = products