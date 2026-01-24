const {Cart, User} = require('../models') ;

exports.createCart = async(req , res , next) => {
    try {
        const { quantity, productId, userId, sizeSelected } = req.body ;
        const createCart = await Cart.create({
            quantity : quantity  ,
            productId : productId ,
            userId : userId ,
            sizeSelected : sizeSelected 
        }) ;
        res.status(200).json({ message: "them gio hang thanh cong", data: createCart }) ;
    } catch (error) {
        next(error) ;
    }
} ;

exports.updateCart = async(req , res , next) => {
    try {
        const { quantity, productId, userId, sizeSelected } = req.body;
        const updateCart = await Cart.update(
            {
                quantity : quantity ,
                sizeSelected : sizeSelected
            } ,
            {
                where : {userId , productId} 
            }
        )
        res.status(200).json({message : "cap nhat gio hang thanh cong"})
    } catch ({error}) {
        next(error) ;
    }
} ;

exports.getAllCart = async(req , res, next) => {
    try {
        const getAllCart = await Cart.findAll() ;
        res.json(getAllCart)
    } catch (error) {
        next(error)
    }
}