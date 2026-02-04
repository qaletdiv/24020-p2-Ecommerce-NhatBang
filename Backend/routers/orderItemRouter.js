const express = require('express') ;
const { createOrderItem, getOrderItemsByOrder } = require('../controllers/orderItemController');
const authenticateToken = require('../middlewares/authenticateToken');
const {createOrderItemValidation} = require('../validators/orderItemValidation') ;
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const routers = express.Router() ;

routers.post('/' ,
    authenticateToken ,
    createOrderItemValidation() ,
    handlerValidationErrors ,
    createOrderItem ,
)
routers.get('/:orderId' ,
    getOrderItemsByOrder
)
module.exports = routers ;