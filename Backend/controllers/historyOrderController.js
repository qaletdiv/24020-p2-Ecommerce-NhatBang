const {HistoryOrder ,User , OrderItem} = require('../models')

exports.createHistoryOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId || req.user.id;
        const { totalPrice, receiverName, phone, email , orderStatus , shippingAddress } = req.body;

        // 1. Tạo đơn hàng
        const order = await HistoryOrder.create({
            userId,
            receiverName , 
            email , 
            phone ,
            totalPrice,
            orderStatus,
            shippingAddress
        });

        res.status(201).json({
            message: "Tạo đơn hàng thành công",
            orderId: order.id
        });

    } catch (error) {
        next(error);
    }
};