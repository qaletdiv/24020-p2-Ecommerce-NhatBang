'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        ...config,
        timezone: '+07:00', // Ép buộc Sequelize dùng múi giờ Việt Nam
        dialectOptions: {
            dateStrings: true, // Không tự động chuyển đổi định dạng ngày
            typeCast: true     // Giúp MySQL trả về đúng kiểu dữ liệu
        }
    }
);
db.Cart = require('./cart')(sequelize, Sequelize.DataTypes);
db.Category = require('./category')(sequelize, Sequelize.DataTypes);
db.Product = require('./product')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Product_Image = require('./productImage')(sequelize, Sequelize.DataTypes);
db.HistoryOrder = require('./historyOrder')(sequelize, Sequelize.DataTypes);
db.OrderItem = require('./orderItem')(sequelize, Sequelize.DataTypes);
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
