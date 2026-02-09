const { Product, Category, Sequelize, sequelize, Product_Image } = require('../models');
const path = require('path');
const fs = require('fs');
const { Op, or } = require('sequelize')

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

function buildWhere(price, category, highlight, search) {
    let where = {};


    if (categoryMap[category]) {
        where.categoryId = categoryMap[category];
    }


    where[Op.and] = [];

    if (highlight === "true") {
        where[Op.and].push(
            sequelize.where(
                sequelize.fn("JSON_CONTAINS", sequelize.col("tags"), JSON.stringify("noi bat")),
                1
            )
        );
    }

    if (search && search.trim() !== "") {
        where.name = {
            [Op.like]: `%${search.trim()}%`
        };
    }

    // nếu không có điều kiện AND thì xóa đi cho sạch
    if (where[Op.and].length === 0) {
        delete where[Op.and];
    }


    if (priceRanges[price]) {
        const [min, max] = priceRanges[price];
        where[Op.or] = [
            {
                [Op.and]: [
                    { priceSale: 0 },
                    { price: { [Op.between]: [min, max] } }
                ]
            },
            {
                [Op.and]: [
                    { priceSale: { [Op.gt]: 0 } },
                    { priceSale: { [Op.between]: [min, max] } }
                ]
            }
        ];
    }

    return where;
}

const buildSort = (sort) => {
    const realPrice = Sequelize.fn(
        "IF",
        Sequelize.where(Sequelize.col('priceSale'), ">", 0),
        Sequelize.col("priceSale"),
        Sequelize.col("price")
    );
    let order = [["id", "DESC"]];
    if (sort === "asc") {
        return order = [[realPrice, "ASC"]]
    }
    if (sort === "desc") {
        return order = [[realPrice, "DESC"]]
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const { category, price, search, sort, highlight, page = 1, limit = 5 } = req.query;
        const where = buildWhere(price, category, highlight, search);
        const order = buildSort(sort);
        const offset = (page - 1) * limit;
        const { rows, count } = await Product.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            order,
            include: [
                {
                    model: Category,
                    as: "category"
                },
                {
                    model: Product_Image,
                    as: "images",
                    attributes: ["id", "imageUrl"]
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
                },
                { model: Product_Image, as: "images", attributes: ["id", "imageUrl"] }
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
            include: [
                {
                    model: Category,
                    as: 'category'
                },
                {
                    model: Product_Image,
                    as: "images",
                    attributes: ["id", "imageUrl"]
                }
            ]
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

