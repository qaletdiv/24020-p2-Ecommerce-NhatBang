'use strict'
const { Model } = require('sequelize') ;

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {
            Cart.belongsTo(models.Product ,{
                foreignKey: 'productId',
                as: 'cart'
            })
        }
    }
    Cart.init (
        {
            quantity :{
                type: DataTypes.INTEGER,
                defaultValue : 1,
            },
            userId : {
                type: DataTypes.INTEGER,
            } ,
            productId : {
                type: DataTypes.INTEGER,
            },
            sizeSelected  : {
                type: DataTypes.STRING,
            }
        },
        {
            sequelize ,
            modelName : 'Cart' ,
            tableName: 'carts' ,
            timestamps : false 
        }
    )
    return Cart ;
}