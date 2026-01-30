const { or } = require('sequelize');
const { OrderItem ,Product } = require('../models');

exports.createOrderItem = async (req, res, next) => {
    try {
        const { orderId, productId, quantity, priceAtPurchase, sizeSelected } = req.body;

        const item = await OrderItem.create({
            orderId,
            productId,
            quantity,
            priceAtPurchase,
            sizeSelected
        });

        res.status(201).json(item);
    } catch (err) {
        next(err);
    }
};

exports.getOrderItemsByOrder = async(req , res ,next ) => {
    try {
        const {orderId} = req.params ;
        const item = await OrderItem.findAll({
            where : {
                orderId : orderId
            } ,
            include : [
                {
                    model : Product ,
                    as: 'product' 
                }
            ]
        })
        if( !item || item.length === 0) {
            return res.status(404).json({message : "Khong tim thay don hang nay"})
        }
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
}