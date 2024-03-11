const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const userController = {};
userController.createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        if(user) throw new Error('이미 가입이 된 유저입니다.');
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
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
        if(!user) throw new Error('유저가 존재하지 않습니다.')
        const isMatch = bcrypt.compareSync(password,user.password);
        if(!isMatch) throw new Error('비밀번호가 일치하지 않습니다.');
        const token = user.generateToken();
        return res.status(200).json({status:"ok", user, token});    
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }
}

userController.getUser = async(req,res) => {
    try {
        const {userId} = req; 
        const user = await User.findById(userId);
        if(!user) throw new Error('can not find user');
        res.status(200).json({status:'ok', user});
    } catch(error) {
        res.status(400).json({status:"fail", message: error.message});
    }
}

module.exports = userController;