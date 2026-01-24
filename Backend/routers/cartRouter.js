const express = require('express') ;
const { createCart, updateCart, getAllCart } = require('../controllers/cartController');
const router = express.Router() ;


router.post('/' ,
    createCart
) ;
router.put('/' ,
    updateCart 
)
router.get('/'  ,
    getAllCart
)

module.exports = router