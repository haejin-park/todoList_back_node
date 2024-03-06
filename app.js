const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);
const MONGODB_URL_PROD = process.env.MONGODB_URL_PROD;
const mongoURI = MONGODB_URL_PROD;
// console.log('mongoURI', mongoURI);
mongoose.connect(mongoURI)
.then(() => {
    console.log("mongoose connected");
}).catch((err) => {
    console.log("DB connection fail", err);
});
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`server is on ${port}`);
});

/*
1.회원가입
유저가 이메일, 패스워드, 유저이름 입력해서 보냄
받은 정보 저장(db모델 필요)
패스워드를 암호화 시켜서 저장

1. 라우터
2. 모델
3. 데이터를 저장(이미 가입된 유저 유무 확인, 패스워드 암호화)
4. 응답을 보낸다


2. 로그인
유저가 이메일, 패스워드 입력해서 보냄
db에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
없으면? 로그인 실패
있다면? 유저 정보 + 토큰
프론트엔드에서는 이 정보를 저장

1. 라우터
2. 이메일 패스워드 정보 읽어오기 
3. 이메일을 가지고 유저정보 가져오기
4. db에있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
5. 맞다면 토큰 발행
6. 틀렸다면 에러메세지 보냄
7. 응답으로 유저정보 + 토큰 보냄
*/