const { Product } = require('../models');
const path = require('path');
const fs = require('fs');
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (error) {
        next(error) ;
    }
}

exports.createProduct = async (req, res, next) => {
    try {
     
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
exports.updateProduct = async ( req , res , next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Khong tim thay san pham' });
        }
        const { name, description, price, priceSale, sizes, tags, categoryId } = req.body;
        const processedImage = req.file ? req.file.processedFileName : null;

        const updateData = {
            name,
            description,
            price: Number(price),
            priceSale: Number(priceSale),
            sizes: sizes ? JSON.parse(sizes) : null,
            tags: tags ? JSON.parse(tags) : null,
            categoryId
        };

        if (processedImage) {
            if(product.imageURL) {
                const oldImagePath = path.join(__dirname , '../public/uploads' , product.imageURL) ;
                fs.unlink(oldImagePath ,(err) => {
                    if(err) console.log('loi xoa anh cu' ,err.message)
                }) 

            }
            updateData.imageURL = processedImage;
        }

        const [updatedRows] = await Product.update(updateData, {
            where: {
                id :req.params.id 
            }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Khong tim thay san pham' });
        }
        res.json({ message: 'Cap nhat san pham thanh cong' , data : product});
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async(req, res , next) => {
    try {
        const deleteRows = await Product.destroy({where : {id : req.params.id}}) ;
        if(deleteRows === 0) {
            return res.status(404).json({ message: 'Khong tim thay san pham' });
        }
        res.status(204).send()
    } catch (error) {
        next(error); 
    }
}

