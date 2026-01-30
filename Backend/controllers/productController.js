const { Product, Category, Sequelize } = require('../models');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize')

const priceRanges = {
    '0-200000': [0, 200000],
    '200000-500000': [200000, 500000],
    '500000-700000': [500000, 700000],
    '700000-1000000': [700000, 1000000]
};
const categoryMap = {
    'shirt-man': 1,
    'shirt-women': 2,
    'sweater': 3,
    't-shirt': 4
}

function buildWhere(price, category, highlight) {
    let where = {};
    if (categoryMap[category]) {
        where.categoryId = categoryMap[category];
    }
    if (highlight === 'true') {
        where.tags = { [Op.like]: ['%noi bat%'] }
    }
    if (priceRanges[price]) {
        const [min, max] = priceRanges[price];
        where[Op.or] = [
            // Trường hợp không sale: dùng price
            {
                [Op.and]: [
                    { priceSale: 0 },
                    { price: max ? { [Op.between]: [min, max] } : { [Op.gt]: min } }
                ]
            },
            // Trường hợp có sale: dùng priceSale
            {
                [Op.and]: [
                    { priceSale: { [Op.gt]: 0 } },
                    { priceSale: max ? { [Op.between]: [min, max] } : { [Op.gt]: min } }
                ]
            }
        ];
    }
    return where;
}
exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, price, highlight, page = 1, limit = 5 } = req.query;
        const where = buildWhere(price, category, highlight);
        const offset = (page - 1) * limit;
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            include: [
                {
                    model: Category,
                    as: 'category'
                }
            ]
        });
        res.json({
            total: count,
            totalPage: Math.ceil(count / limit),
            currentPage: Number(page),
            products: rows
        });
    } catch (error) {
        next(error);
    }
};
exports.getProductId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: "category"
                }
            ]
        })
        if (!product) {
            return res.status(404).json({ message: 'khong tim thay san pham' });
        }

        res.json(product);
    } catch (error) {
        next(error);
    }
}
exports.getSimilarProducts = async (req, res, next) => { //Tìm sản phẩm tương tự
    try {
        const { categoryId, excludeId, limit = 3, page = 1 } = req.query; // excludeId : loại trừ ID
 
        const offset = (page - 1) * limit;

        const { rows: products, count } = await Product.findAndCountAll({
            where: {
                categoryId: categoryId,
                id: { [Op.ne]: excludeId }
            },
            limit: Number(limit),
            offset: Number(offset),
            include: [{ model: Category, as: 'category' }]
        });

        const totalPage = Math.ceil(count / limit);

        res.json({
            products,
            totalPage
        });
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {

        const { name, description, price, priceSale, sizes, tags, categoryId } = req.body;
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
exports.updateProduct = async (req, res, next) => {
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
            if (product.imageURL) {
                const oldImagePath = path.join(__dirname, '../public/uploads', product.imageURL);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.log('loi xoa anh cu', err.message)
                })

            }
            updateData.imageURL = processedImage;
        }

        const [updatedRows] = await Product.update(updateData, {
            where: {
                id: req.params.id
            }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Khong tim thay san pham' });
        }
        res.json({ message: 'Cap nhat san pham thanh cong', data: product });
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteRows = await Product.destroy({ where: { id: req.params.id } });
        if (deleteRows === 0) {
            return res.status(404).json({ message: 'Khong tim thay san pham' });
        }
        res.status(204).send()
    } catch (error) {
        next(error);
    }
}

