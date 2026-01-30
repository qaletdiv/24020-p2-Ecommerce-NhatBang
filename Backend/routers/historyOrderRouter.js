const express = require('express');
const {createHistoryOrder, updateHistoryOrder, getAllHistoryOrder} = require('../controllers/historyOrderController')
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/' ,
    authenticateToken ,
    createHistoryOrder 
)
router.put('/:id' ,
    // authenticateToken ,
    updateHistoryOrder
)
router.get('/' ,
    getAllHistoryOrder
)

module.exports = router