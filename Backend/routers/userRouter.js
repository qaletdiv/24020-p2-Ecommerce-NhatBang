const express = require('express');
const { register, login, getMe, getAllUser } = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../validators/userValidator');
const handlerValidationErrors = require('../middlewares/validationErrorHandler');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router() ;


router.post('/register' ,
    registerValidation() ,
    handlerValidationErrors ,
    register
)
router.post('/login' ,
    loginValidation() ,
    handlerValidationErrors ,
    login
)
router.get('/getMe', 
    authenticateToken ,
    getMe
)
router.get('/getAllUser' , 
    authenticateToken ,
    getAllUser
)

module.exports = router