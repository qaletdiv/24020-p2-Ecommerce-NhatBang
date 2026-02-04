const { body, param, query } = require('express-validator');

const createCartValidation = () => {
    return [
        body('productId')
            .notEmpty().withMessage("productId khong duoc bo trong")
            .isInt({ gt: 0 }).withMessage("productId phai la so nguyen")
            .trim(),
        body('quantity')
            .notEmpty().withMessage('quantity khong duoc bo trong')
            .isInt({ gt: 0 }).withMessage("quantity phai la so nguyen")
            .trim() ,
        body('sizeSelected')
            .notEmpty().withMessage('sizeSelected khong duoc bo trong')
            .isString().withMessage('sizeSelected phai la chuoi')
            .trim() 
    ]
}
const updateCartValidation = () => {
    return [
        body('productId')
            .notEmpty().withMessage("productId khong duoc bo trong")
            .isInt({ gt: 0 }).withMessage("productId phai la so lon hon 0")
            .trim(),
        body('quantity')
            .notEmpty().withMessage('quantity khong duoc bo trong')
            .isInt({ gt: 0 }).withMessage("quantity phai la so lon hon 0")
            .trim(),
        body('sizeSelected')
            .notEmpty().withMessage('sizeSelected khong duoc bo trong')
            .isString().withMessage('sizeSelected phai la chuoi')
            .trim() 
    ]
}
const deleteCartValidation = () =>
     [
    body('productId').notEmpty().withMessage('ProductId là bắt buộc'),
    body('sizeSelected').notEmpty().withMessage('Size là bắt buộc'),
];

module.exports = {createCartValidation ,updateCartValidation , deleteCartValidation } ;