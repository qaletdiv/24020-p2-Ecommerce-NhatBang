const express = require('express') ;
const { createOrderItem, getOrderItemsByOrder } = require('../controllers/orderItemController');
const authenticateToken = require('../middlewares/authenticateToken');
const routers = express.Router() ;

routers.post('/' ,
    authenticateToken ,
    createOrderItem ,
)
routers.get('/:orderId' ,
    getOrderItemsByOrder
)
module.exports = routers ;