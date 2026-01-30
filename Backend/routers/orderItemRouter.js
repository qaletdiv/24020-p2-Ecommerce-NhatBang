const express = require('express') ;
const { createOrderItem } = require('../controllers/orderItemController');
const authenticateToken = require('../middlewares/authenticateToken');
const routers = express.Router() ;

routers.post('/' ,
    authenticateToken ,
    createOrderItem ,
)

module.exports = routers ;