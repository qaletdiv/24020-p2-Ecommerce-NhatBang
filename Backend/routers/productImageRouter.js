const express = require('express') ;
const router = express.Router() ;
const{createProductImage, updateProductImage} = require('../controllers/productImageController');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const { resizeImage } = require('../middlewares/imageProcessingMiddleware');
router.post('/' ,
    uploadSingleImage('imageUrl') ,
    resizeImage ,
    createProductImage
)
router.put('/:id' ,
    uploadSingleImage('imageUrl'),
    resizeImage ,
    updateProductImage
)
module.exports = router