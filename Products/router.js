const express = require('express')
const router = express.Router()

const { addProduct, allProducts, updateProduct, deleteProduct, searchProduct } = require('./controller')

router.get('/all-products', allProducts)
router.get('/search-product', searchProduct)

router.post('/add-product', addProduct)
router.put('/update-product', updateProduct)
router.delete('/delete-product', deleteProduct)

module.exports = router