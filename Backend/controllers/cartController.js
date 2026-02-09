const { json } = require('sequelize');
const { Cart, User, Product  ,Product_Image} = require('../models');
exports.addToCart = async (req, res, next) => {
    try {
        const userId = req.user.userId || req.user.id;
        const { quantity, productId , sizeSelected } = req.body;

        // 1. Kiểm tra xem sản phẩm cùng Size đã tồn tại trong giỏ của User chưa
        const existingItem = await Cart.findOne({
            where: {
                userId: Number(userId),
                productId: Number(productId),
                sizeSelected: String(sizeSelected).trim()   
            }
        });

        if (existingItem) {
            // 2. Nếu đã có: Thực hiện CỘNG DỒN số lượng
            const newQuantity = existingItem.quantity + Number(quantity);
            await existingItem.update({ quantity: newQuantity });

            return res.status(200).json({
                message: 'Da cong don san pham',
                data: existingItem
            });
        }

        // 3. Nếu chưa có: Tạo mới hoàn toàn
        const newItem = await Cart.create({
            quantity: Number(quantity),
            productId : Number(productId),
            userId : Number(userId),
            sizeSelected: String(sizeSelected).trim()   
        });

        return res.status(201).json({
            message: "Them vao gio hang thanh cong",
            data: newItem
        });

    } catch (error) {
        next(error);
    }
};

exports.updateCartQuantity = async (req, res, next) => {
    try {
        const userId = req.user.userId || req.user.id;
        const { quantity, productId, sizeSelected } = req.body;

        // Cập nhật giá trị
        const [updatedRows] = await Cart.update(
            { quantity: Number(quantity) },
            {
                where: {
                    userId: userId,
                    productId: Number(productId), 
                    sizeSelected: String(sizeSelected).trim() 
                }
            }
        );

        if (updatedRows === 0) {
         
            return res.status(404).json({ message: "khong tim thay san pham" });
        }

        res.status(200).json({ message: "Cap nhat thanh cong" });
    } catch (error) {
        next(error);
    }
};
exports.getAllCart = async (req, res, next) => {
    try {
        const userId = req.user.userId || req.user.id;

        const getAllCart = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'priceSale'],
                    include: [
                        {
                            model: Product_Image,
                            as: 'images',
                            attributes: ['id', 'imageUrl']
                        }
                    ]
                }
            ]
        });

        res.json(getAllCart);
    } catch (error) {
        next(error);
    }
};



exports.deleteCartById = async ( req , res , next) => {
    try {
        const {productId , sizeSelected} = req.body ;
        const userId = req.user.userId ;
        const deleteRows = await Cart.destroy({
            where : {
                userId: Number(userId),
                productId: Number(productId),
                sizeSelected: String(sizeSelected).trim()
            }
        });
        if( deleteRows === 0) {
            return res.status(404).json({
                message : "khong tim thay san pham de xoa"
            }) 
        }
        res.status(200).json({
            message :"xoa thanh cong san pham ra khoi gio hang" ,
            data : {
                productId ,
                sizeSelected 
            }
        })
    } catch (error) {
            next(error) ;
    }
} ;

exports.clearCart = async (req, res, next) => {
    try {
        const userId = req.user.userId || req.user.id;

        const deletedRows = await Cart.destroy({
            where: { userId }
        });

        res.status(200).json({
            message: 'Da xoa toan bo gio hang',
            deletedRows
        });
    } catch (error) {
        next(error);
    }
};
