const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};
userController.createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user) throw new Error('이미 가입이 된 유저입니다.');
        if(!name || !email || !password) throw new Error('이름, 이메일, 비밀번호 등 필수 정보를 입력해주세요.');
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        // console.log('hash', hash);
        const newUser = new User({name, email, password:hash});
        await newUser.save();
        res.status(200).json({status:'ok'});
    } catch(error) {
        res.status(400).json({status:'fail', message: error.message});
    }
};

userController.loginWithEmail = async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email},"-createdAt -updatedAt -__v");
        if(user) {
            const isMatch = bcrypt.compareSync(password,user.password);
            if(isMatch) {
                const token = user.generateToken();
                return res.status(200).json({status:"ok", user, token});
            } 
        }
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }
}

module.exports = userController;