const { Product } = require('../models');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: {

            }
        })
    } catch (error) {

    }
}

exports.createProduct = async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        const { name, description, price, priceSale, imageURL, sizes, tags, categoryId } = req.body;
        const processedImage = req.file ? req.file.processedFileName : null;
        
        const newProduct = await Product.create({
            name,
            description,
            price: Number(price),
            priceSale: Number(priceSale),
            imageURL: processedImage,
            sizes: JSON.parse(sizes),
            tags: JSON.parse(tags),
            categoryId
        });
        res.status(201).json({
            message: 'Tao thanh cong san pham',
            data: newProduct
        })
    } catch (error) {
        next(error)
    }
}

