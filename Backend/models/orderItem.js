'use strict' ;
const {Model, DataTypes , Sequelize} = require('sequelize') ;

module.exports = (sequelize , DataTypes) => {
    class OrderItem extends Model {
        static associate (models) {
            OrderItem.belongsTo(models.Product ,{
                foreignKey : 'productId' ,
                as : 'product' 
            }) ;
            OrderItem.belongsTo(models.HistoryOrder, {
                foreignKey: 'orderId',
                as: 'order'
            });
        }
    }
    OrderItem.init (
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: true 
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            priceAtPurchase: { 
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            sizeSelected: {
                type: DataTypes.STRING(10)
            }
        },
        {
            sequelize,
            modelName: 'OrderItem',
            tableName: 'orderItems',
            timestamps: true,
            
        }
    )
    return OrderItem
}