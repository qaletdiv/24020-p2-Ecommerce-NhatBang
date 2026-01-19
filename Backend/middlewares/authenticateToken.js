const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "yeu cau token xac thuc khong hop le" })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodePayload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Token het han" });
            }
            return res.status(403).json({ message: "Token khong hop le" });
        }
        const userId = decodePayload.userId;
        if (!userId) {
            return res.status(403).json({ message: 'Token khong hop le ( thieu thong tin )' })
        }
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(401).json({ message: "Xac thuc that bai (Nguoi dung khong ton tai" });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("loi truy van nguoi dung trong Authenticate Token", error);
            next(error);
        }
    })
}

module.exports = authenticateToken