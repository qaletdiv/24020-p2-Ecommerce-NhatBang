const express = require('express');
const {createHistoryOrder, updateHistoryOrder, getAllHistoryOrder} = require('../controllers/historyOrderController')
const authenticateToken = require('../middlewares/authenticateToken');
const {createHistoryOrderValidation , updateHistoryOrderValidation} = require('../validators/historyOrderValidation');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const router = express.Router();

router.post('/' ,
    authenticateToken ,
    createHistoryOrderValidation() ,
    handlerValidationErrors,
    createHistoryOrder 
)
router.put('/:id' ,
    authenticateToken ,
    updateHistoryOrderValidation() ,
    handlerValidationErrors ,
    updateHistoryOrder
)
router.get('/' ,
    getAllHistoryOrder
)

module.exports = router