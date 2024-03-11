const authController = {}
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.authenticate = (req,res,next) => {
    try {
        const tokenString = req.headers.authorization;
        if(!tokenString) throw new Error("헤더에 토큰이 존재하지 않습니다.");
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) =>{
            if(error) throw new Error('토큰이 유효하지 않습니다.');
            req.userId = payload._id;
        });
        next();

    } catch (error) {
        res.status(400).json({status:"fail", message:error.message});
    }
}
module.exports = authController;