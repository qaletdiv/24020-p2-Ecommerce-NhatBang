const db = require('../models');
const bcrypt = require('bcrypt');

const seedAdmin = async () => {

    const admin = await db.User.findOne({
        where: { email: 'admin@gmail.com' }
    });

    if (!admin) {

        const hash = await bcrypt.hash('123456', 10);

        await db.User.create({
            fullname: 'Admin',   
            email: 'admin@gmail.com',
            password: hash,
            role: 'ADMIN'
        });

        console.log("Admin created");
    }
};

module.exports = seedAdmin;