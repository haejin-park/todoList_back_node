const authController = {}
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.authenticate = (req,res,next) => {
    try {
        const tokenString = req.headers.authorization; //Bearer 토큰값
        if(!tokenString) throw new Error("Invalid token");
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) =>{
            if(error) {
                throw new Error('Invalid token');
            }
            //console.log('payload',payload); //res써주기 전 terminal에서 id값 확인
            req.userId = payload._id;
        });
        next();

    } catch (error) {
        res.status(400).json({status:"fail", message:error.message});
    }
}
module.exports = authController;