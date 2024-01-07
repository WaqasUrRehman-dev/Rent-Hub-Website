const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    productPrice: { type: String, required: true },
    productPicture: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: Boolean, default: true },
    ownerName: { type: String, required: true },
    ownerID: { type: String, required: true },
    ownerNumber: { type: String, required: true },
    ownerEmail: { type: String, required: true },
})

const Products = model("products", productSchema)
module.exports = Products