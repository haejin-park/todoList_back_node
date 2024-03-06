const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

//1.회원가입 endpoint
router.post("/", userController.createUser);
//2.로그인 endpoint
router.post("/login", userController.loginWithEmail);
//3.토큰을 통해 유저 id 빼내고 그 id로 유저 객체를 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;