const { body } = require('express-validator');

const registerValidation = () => {
    return [
        body('fullname')
            .notEmpty().withMessage('Họ tên không được bỏ trống')
            .isLength({ min: 3 }).withMessage('Họ tên tối thiểu 3 ký tự'),

        body('email')
            .notEmpty().withMessage('Email không được bỏ trống')
            .isEmail().withMessage('Email không đúng định dạng'),

        body('phone')
            .notEmpty().withMessage('Số điện thoại không được bỏ trống')
            .isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),

        body('address')
            .notEmpty().withMessage('Địa chỉ không được bỏ trống'),

        body('password')
            .notEmpty().withMessage('Mật khẩu không được bỏ trống')
            .isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự')
    ];
};

const loginValidation = () => {
    return [
        body('emailOrPhone')
            .notEmpty().withMessage('Email hoặc số điện thoại không được bỏ trống'),

        body('password')
            .notEmpty().withMessage('Mật khẩu không được bỏ trống')
    ];
};

module.exports = {
    registerValidation,
    loginValidation
};
