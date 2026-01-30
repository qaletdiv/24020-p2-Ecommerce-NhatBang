const { OrderItem } = require('../models');

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