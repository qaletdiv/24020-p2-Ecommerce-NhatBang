const express = require('express') ;
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductId, getSimilarProducts } = require('../controllers/productController');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const { resizeImage } = require('../middlewares/imageProcessingMiddleware');
const authenticateToken = require('../middlewares/authenticateToken');
const{ createProductValidation , updateProductValidation , deleteProductValidation} = require('../validators/productValidation');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const router = express.Router() ;

router.post('/' ,
    authenticateToken,
    uploadSingleImage('imageURL') ,
    createProductValidation() ,
    handlerValidationErrors ,
    resizeImage ,
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
    uploadSingleImage('imageURL'),
    updateProductValidation() ,
    handlerValidationErrors ,
    resizeImage,
    updateProduct
)
router.delete('/:id', 
    authenticateToken ,
    deleteProductValidation() ,
    handlerValidationErrors ,
    deleteProduct
)
module.exports = router