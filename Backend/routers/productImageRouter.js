const express = require('express') ;
const router = express.Router() ;
const{createProductImage, updateProductImage, deleteProductImage} = require('../controllers/productImageController');
const { uploadSingleImage } = require('../middlewares/uploadMiddleware');
const { resizeImage } = require('../middlewares/imageProcessingMiddleware');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');
router.post('/create' ,
    authenticateToken,
    authorizeRole('admin'),
    uploadSingleImage('imageUrl') ,
    resizeImage ,
    createProductImage
)
router.put('/update/:id' ,
    authenticateToken,
    authorizeRole('admin'),
    uploadSingleImage('imageUrl'),
    resizeImage ,
    updateProductImage
)
router.delete('/delete/:id'  ,
    authenticateToken ,
    authorizeRole('admin'),
    deleteProductImage
)
module.exports = router