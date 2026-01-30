const express = require('express');
const { addToCart, updateCartQuantity, getAllCart , deleteCart } = require('../controllers/cartController');
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
router.delete('/', authenticateToken, deleteCart);

module.exports = router