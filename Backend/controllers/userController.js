const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const {User, Sequelize} = require('../models') ;

exports.register = async (req, res ,next) => {
    try {
        const { fullname, email, address, phone, password } = req.body;
        const saltRounds = 10 ;
        const hashedPassword =  await bcrypt.hash(password , saltRounds) ;
        const newUser = await User.create({
            fullname ,
            email ,
            address ,
            phone ,
            password : hashedPassword
        }) ;
        const userResponse = await User.findByPk(newUser.id)
        res.status(201).json({
            message : "Dang ky thanh cong" ,
            user : userResponse
        })
    } catch (errors) {
        if(errors.name === 'SequelizeUniqueConstraintError') {
            const field = errors.errors[0].path ;
            return res.status(400).json({
                message : "Lỗi đăng ký" ,
                errors : [
                    {
                        msg: `${field } đã tồn tại ` ,
                        path: field 
                    }
                ]
            })
        }
        next(errors) ;
    }
}  ;

exports.login = async(req , res , next) => {
    try {
        const {emailOrPhone , password} = req.body ;
        const user = await User.scope("withPassword").findOne(
            {
                where : {
                    [Sequelize.Op.or] : [
                        {
                            email : emailOrPhone
                        },
                        {
                            phone : emailOrPhone 
                        }
                    ]
                }
            }
        )
        if(!user) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
        }
        const isMath = await bcrypt.compare(password , user.password) // so sang coi thu password co giong nhau
        if(!isMath) {
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
        } ;
        const payload =  {
            userId : user.id 
        } ;
        const secretKey = process.env.JWT_SECRET ;
        const expiresIn = process.env.JWT_EXPIRES_IN || "1h" ;

        const token = jwt.sign(payload ,secretKey , {expiresIn : expiresIn}) ;

        res.json( {
            message : "dang nhap thanh cong" ,
            token : token ,
            user : {
                id : user.id ,
                fullname : user.fullname ,
                address : user.address ,
                email : user.email ,
                phone : user.phone,
                role: user.role
            }
        }) 
    } catch (error) {
        next(error) ;
    }
} ;

exports.getMe = async(req ,res, next) => {
    res.json({user : req.user})
}

exports.getAllUser = async(req , res, next) => {
    const getAllUser = await User.findAll() ;
    res.json(getAllUser) ;
}