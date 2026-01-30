'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Cart, {
                foreignKey: 'userId',
                as: 'carts'
            });
            User.hasMany(models.HistoryOrder, {
                foreignKey: 'userId',
                as: 'orders'
            })
        }
    }
    User.init(
        {
            fullname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            address: {
                type: DataTypes.TEXT,
            },
            phone: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.ENUM('user', 'admin'),
                allowNull: false,
                defaultValue: 'user'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: 'users',
            timestamps: true,
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                withPassword: {
                    attributes: {
                        include: ['password']
                    }
                }
            }
        }
    )
    return User
}