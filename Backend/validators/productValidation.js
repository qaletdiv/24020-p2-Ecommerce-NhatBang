const { body, param, query } = require('express-validator');

const createProductValidation = () => {
    return [
        body('name')
            .notEmpty().withMessage('Tên sản phẩm không được bỏ trống')
            .isLength({ min: 3, max: 100 }).withMessage('Tên sản phẩm phải từ 3 - 100 ký tự')
            .trim(),

        body('price')
            .notEmpty().withMessage('Price không được bỏ trống')
            .isNumeric().withMessage('Price phải là số'),

        body('priceSale')
            .notEmpty().withMessage('PriceSale không được bỏ trống (nếu không có thì để 0)')
            .isNumeric().withMessage('PriceSale phải là số'),

        body('description')
            .notEmpty().withMessage('Miêu tả sản phẩm không được bỏ trống')
            .trim(),

        body('sizes')
            .notEmpty().withMessage('Sizes không được bỏ trống'),

        body('categoryId')
            .notEmpty().withMessage('Category không được bỏ trống') ,
        body('imageURL')
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Hình ảnh không được bỏ trống');
                }
                return true;
            })
    ];
}
const updateProductValidation = () => {
    return [
        param('id')
            .isInt().withMessage('ID sản phẩm không hợp lệ'),

        body('name')
            .optional()
            .isLength({ min: 3, max: 100 }).withMessage('Tên sản phẩm phải từ 3 - 100 ký tự')
            .trim(),

        body('price')
            .optional()
            .isNumeric().withMessage('Price phải là số'),

        body('priceSale')
            .optional()
            .isNumeric().withMessage('PriceSale phải là số'),

        body('description')
            .optional()
            .notEmpty().withMessage('Mô tả không được rỗng')
            .trim(),

        body('sizes')
            .optional()
            .notEmpty().withMessage('Sizes không được rỗng'),

        body('categoryId')
            .optional()
            .isInt().withMessage('CategoryId không hợp lệ'),

        body('imageURL')
            .optional()
            .custom((value, { req }) => {
                if (req.file && !req.file.processedFileName) {
                    throw new Error('File ảnh không hợp lệ');
                }
                return true;
            })
    ];
};
const deleteProductValidation = () => {
    return [
        param('id')
            .isInt().withMessage('ID sản phẩm không hợp lệ')
    ];
};
module.exports = {createProductValidation , updateProductValidation , deleteProductValidation}