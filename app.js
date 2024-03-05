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
