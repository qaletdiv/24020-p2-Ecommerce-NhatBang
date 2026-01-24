const express = require('express');
const { register, login, getMe, getAllUser } = require('../controllers/userController');
const router = express.Router() ;


router.post('/register' ,
    register
)
router.post('/login' ,
    login
)
router.get('/getMe', 
    getMe
)
router.get('/getAllUser' , 
    getAllUser
)

module.exports = router