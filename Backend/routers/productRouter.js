const express = require('express') ;
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductId, getSimilarProducts } = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');
const{ createProductValidation , updateProductValidation , deleteProductValidation} = require('../validators/productValidation');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const authorizeRole = require('../middlewares/authorizeRole');
const router = express.Router() ;

router.post('/' ,
    authenticateToken,
    authorizeRole('admin') ,
    createProductValidation() ,
    handlerValidationErrors ,
    createProduct
)
router.get('/' ,
    getAllProducts
)
router.get('/similar',//Tìm sản phẩm tương tự
    getSimilarProducts 
)
router.get('/:id' ,
    getProductId
)
router.put('/:id',
    authenticateToken ,
    authorizeRole('admin'),
    updateProductValidation() ,
    handlerValidationErrors ,
    updateProduct
)
router.delete('/:id', 
    authenticateToken ,
    authorizeRole('admin'),
    deleteProductValidation() ,
    handlerValidationErrors ,
    deleteProduct
)
module.exports = router