const express = require('express') ;
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { createCategoryValidation, commonIdParamValidation, updateCategoryValidation } = require('../validators/categoryValidator');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router() ;

router.post('/', /// them Danh Muc
    authenticateToken ,
    createCategoryValidation() ,
    handlerValidationErrors ,
    createCategory
) ;
router.get('/', /// lay tat ca Danh Muc
    authenticateToken ,
    getAllCategory
);
router.put('/:id' ,
    authenticateToken ,
    commonIdParamValidation() ,
    updateCategoryValidation() ,
    handlerValidationErrors ,
    updateCategory
)
router.delete('/:id' ,
    authenticateToken ,
    commonIdParamValidation() ,
    handlerValidationErrors ,
    deleteCategory
)

module.exports = router