const express = require('express');
const {createHistoryOrder} = require('../controllers/historyOrderController')
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/' ,
    authenticateToken ,
    createHistoryOrder 
)

module.exports = router