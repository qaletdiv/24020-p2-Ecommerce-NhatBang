const { body, param } = require("express-validator");

const createHistoryOrderValidation = () => {
    return [
        body("totalPrice")
            .notEmpty().withMessage("totalPrice khong duoc de trong")
            .isFloat({ min: 0 }).withMessage("totalPrice phai la so >= 0"),

        body("receiverName")
            .notEmpty().withMessage("receiverName khong duoc de trong")
            .isString().withMessage("receiverName phai la chuoi")
            .isLength({ min: 2 }).withMessage("receiverName toi thieu 2 ky tu"),

        body("phone")
            .notEmpty().withMessage("phone khong duoc de trong"),

        body("email")
            .notEmpty().withMessage("email khong duoc de trong")
            .isEmail().withMessage("email khong hop le"),

        body("orderStatus")
            .optional()
            .isIn(["Dang cho xu ly", "Da giao hang", "Hoan thanh"])
            .withMessage("orderStatus phai la: Dang cho xu ly / Da giao hang / Hoan thanh"),

        body("shippingAddress")
            .notEmpty().withMessage("shippingAddress khong duoc de trong")
            .isString().withMessage("shippingAddress phai la chuoi")
            .isLength({ min: 5 }).withMessage("shippingAddress toi thieu 5 ky tu"),
    ];
};

const updateHistoryOrderValidation = () => {
    return [
        param("id")
            .notEmpty().withMessage("id khong duoc de trong")
            .isInt({ min: 1 }).withMessage("id phai la so nguyen duong"),

        body("orderStatus")
            .notEmpty().withMessage("orderStatus khong duoc de trong")
            .isIn(["Dang cho xu ly", "Da giao hang", "Hoan thanh"])
            .withMessage("orderStatus phai la: Dang cho xu ly / Da giao hang / Hoan thanh"),
    ];
};

module.exports = { createHistoryOrderValidation, updateHistoryOrderValidation };
