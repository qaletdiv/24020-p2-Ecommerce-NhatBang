'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize ,DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Cart, {
                foreignKey: 'productId',
                as: 'carts'
            });

            Product.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category'
            });

            Product.hasMany(models.Product_Image, {
                foreignKey: 'productId',
                as: 'images'
            });
            Product.hasMany(models.OrderItem, {
                foreignKey: 'productId',
                as: 'orderItems'
            });
        }
    }

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            priceSale: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
            },
            imageURL: {
                type: DataTypes.STRING,
            },
            sizes: {
                type: DataTypes.JSON, 
            },
            tags: {
                type: DataTypes.JSON, 
            },
            description: {
                type: DataTypes.TEXT,
            },
            
            categoryId: {
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps : false
            
        }
    );

    return Product;
};
