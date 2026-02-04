const express = require('express');
const { addToCart, updateCartQuantity, getAllCart, deleteCartById, clearCart } = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authenticateToken');
const { createCartValidation, updateCartValidation, deleteCartValidation } = require('../validators/cartValidator');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const router = express.Router();


router.post('/',
    authenticateToken,
    createCartValidation(),
    handlerValidationErrors,
    addToCart

);
router.put('/',
    authenticateToken,
    updateCartValidation(),
    handlerValidationErrors,
    updateCartQuantity
)
router.get('/',
    authenticateToken,
    getAllCart
)
router.delete('/',
    authenticateToken,
    deleteCartValidation(),
    handlerValidationErrors,
    deleteCartById);
router.delete('/clear',
    authenticateToken,
    clearCart
)
module.exports = router