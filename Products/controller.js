const productSchema = require('./schema')

const addProduct = async (req, res) => {
    const { productName, productBrand, productPrice, productPicture, address, city, ownerName, ownerID, ownerNumber, ownerEmail } = req.body
    if (productName && productBrand && productPrice && productPicture, address, city, ownerName, ownerID, ownerNumber, ownerEmail) {
        try {
            const checkProduct = await productSchema.exists({ productName })
            if (!checkProduct) {
                await productSchema.create({ productName, productBrand, productPrice, productPicture, address, city, ownerName, ownerID, ownerNumber, ownerEmail })
                res.status(201).json("Product added Successfully")
            } else {
                res.status(400).json("Product already exist")
            }
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    } else {
        res.status(403).json("Required field missing")
    }
}

const allProducts = async (req, res) => {
    try {
        const all_Products = await productSchema.find()
        res.json({ Products: all_Products })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id, productName, productBrand, productPicture, productPrice, address, city, ownerName, ownerNumber, ownerID, ownerEmail } = req.body
    try {
        const filter = { id }
        const update = { productName, productBrand, productPicture, productPrice, address, city, ownerName, ownerNumber, ownerID, ownerEmail }
        const update_Product = await productSchema.findOneAndUpdate(filter, update, { new: true })
        res.status(201).json({ message: "Product Updated Successfully", Products: update_Product })
    } catch (error) {
        res.json(404).json({ message: "Product Not Found" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const delete_product = await productSchema.findOneAndDelete({ _id: req.body._id })
        res.status(201).json({ message: "Product Deleted Successfully", Products: delete_product })
    } catch (error) {
        res.json(404).json({ message: "Product Not Found" })
    }
}

const searchProduct = async (req, res) => {
    const { productName } = req.query;
    try {
        const search_product = await productSchema.find({ productName })
        if (search_product.length > 0) {
            res.json({ search_product, found_records: search_product.length })
        }
        else {
            res.status(404).json({ message: `Results Not Found for Product ${productName}. please! start with Capital letter` })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { addProduct, allProducts, updateProduct, deleteProduct, searchProduct }