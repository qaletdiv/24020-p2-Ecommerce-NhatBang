const express = require('express');
const { addToCart, updateCartQuantity, getAllCart , deleteCartById , clearCart } = require('../controllers/cartController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();


router.post('/',
    authenticateToken,
    addToCart

);
router.put('/',
    authenticateToken,
    updateCartQuantity
)
router.get('/',
    authenticateToken,
    getAllCart
)
router.delete('/', authenticateToken,
     deleteCartById);
router.delete('/clear' ,
    authenticateToken ,
    clearCart
)
module.exports = router