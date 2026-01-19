const { body, param } = require('express-validator');

const commonIdParamValidation = () => {
    return [
        param('id')
            .isInt({ min: 1 }).withMessage('id danh muc la so nguyen')
    ]
};

const createCategoryValidation = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Danh muc khong duoc bo trong')
            .isLength({ min: 3, max: 255 }).withMessage("ten danh muc phai tu 3 den 255 ky tu ")
            
    ]
}
const updateCategoryValidation = () => {
    return [
        body('name').optional()
            .trim()
            .isLength({ min: 3, max: 255 }).withMessage("ten danh muc phai tu 3 den 255 ky tu ")
            
    ]
}

module.exports = {
    commonIdParamValidation ,
    createCategoryValidation , 
    updateCategoryValidation
}