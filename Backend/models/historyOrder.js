'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HistoryOrder extends Model {
        static associate(models) {
            HistoryOrder.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
            HistoryOrder.hasMany(models.OrderItem, {
                foreignKey: 'orderId',
                as: 'orderItems'
            });
        }
    }

    HistoryOrder.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            receiverName: {
                type: DataTypes.STRING(100)
            },

            phone: {
                type: DataTypes.STRING(20)
            },

            email: {
                type: DataTypes.STRING(100)
            },

            shippingAddress: {
                type: DataTypes.TEXT,
                allowNull: false
            },

            totalPrice: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false
            },

            orderStatus: {
                type: DataTypes.ENUM("Đang chờ xử lý", "Đã giao hàng", "Hoàn thành"),
                defaultValue: "Đang chờ xử lý"
            }
        },
        {
            sequelize,
            modelName: "HistoryOrder",
            tableName: "historyOrders",
            timestamps: true
        }
    );

    return HistoryOrder;
};
