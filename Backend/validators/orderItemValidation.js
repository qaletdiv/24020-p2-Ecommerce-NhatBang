const {body , param} = require('express-validator');

const createOrderItemValidation = () => {
    return [
        body("orderId")
            .notEmpty().withMessage("orderId khong duoc de trong")
            .isInt({ min: 1 }).withMessage("orderId phai la so nguyen duong"),

        body("productId")
            .notEmpty().withMessage("productId khong duoc de trong")
            .isInt({ min: 1 }).withMessage("productId phai la so nguyen duong"),

        body("quantity")
            .notEmpty().withMessage("quantity khong duoc de trong")
            .isInt({ min: 1 }).withMessage("quantity phai >= 1"),

        body("priceAtPurchase")
            .notEmpty().withMessage("priceAtPurchase khong duoc de trong")
            .isFloat({ min: 0 }).withMessage("priceAtPurchase phai la so >= 0"),

        body("sizeSelected")
            .notEmpty().withMessage("sizeSelected khong duoc de trong")
            .isString().withMessage("sizeSelected phai la chuoi"),
    ];
};

module.exports = {
    createOrderItemValidation
}