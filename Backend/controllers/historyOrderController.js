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

exports.updateHistoryOrder = async(req , res , next) => {
    try {
        const {id} = req.params ;
        const { orderStatus } = req.body ;
        const order = await HistoryOrder.findByPk(id) ;
        if(!order) {
            return res.status(404).json({message : "khong tim thay don hang"}) ;

        }

        await order.update({
            orderStatus 
        })

        res.status(200).json({
            message : `Da cap nhat trang thai don hang thanh cong ${orderStatus}`,
            data : order 
        })
    } catch (error) {
        next(error) ;
    }
}

exports.getAllHistoryOrder = async(req , res , next) => {
    try {
        const { totalPrice, receiverName, phone, email, orderStatus, shippingAddress } = req.query ;
        const getAllHistoryOrder = await HistoryOrder.findAll({
            include : [
                {
                    model: OrderItem , 
                    as: 'orderItems'
                }
            ]
        })
        res.json({
            getAllHistoryOrder
        })
    } catch (error) {
        next(error)
    }
}
