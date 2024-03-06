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
        res.status(400).json({status:'fail', error: error.message});
    }
};


module.exports = userController;