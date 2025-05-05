require('dotenv').config();

const express = require("express");
const qr = require("qrcode");
const generatePayload = require("promptpay-qr");
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");

const app = express();
const port = process.env.PORT||8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log("server is running on port " + port);
});
