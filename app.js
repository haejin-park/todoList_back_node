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
*/