const express = require('express') ;
const { createProduct } = require('../controllers/productController');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const { resizeImage } = require('../middlewares/imageProcessingMiddleware');
const router = express.Router() ;

router.post('/' ,
    uploadSingleImage('imageURL') ,
    resizeImage ,
    createProduct
)

module.exports = router