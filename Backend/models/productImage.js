'use strict';

const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product_Image extends Model {
        static associate(models) {
            Product_Image.belongsTo(models.Product, {
                foreignKey: 'productId',
                as: 'product'
            })
        }
    };
    Product_Image.init(
        {
            imageUrl: {
                type: DataTypes.STRING,
            } ,
            productId : {
                type: DataTypes.INTEGER,
            }
        } ,
        {
            sequelize , 
            modelName: 'Product_Image' ,
            tableName: 'productImages' ,
            timestamps : false ,
        }
    );
    return Product_Image ;
}