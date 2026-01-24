const { body, param, query } = require('express-validator');

const createProductValidation = () => {
    return [
        query('name')
            .notEmpty().withMessage('Ten san pham tu 3-5 ky tu')
            .trim(),
        query('price')
        .notEmpty().withMessage('Price khong duoc bo trong') 
        .trim()
    ]
}