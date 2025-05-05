require('dotenv').config();

const express = require("express");
const qr = require("qrcode");
const generatePayload = require("promptpay-qr");
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");

//middleware
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const testMobile = "0805867399";
const path = require('path');
app.get("/", async(req, res, next) => {
  try{
    return res.sendFile(path.join(__dirname, '../index.html'));
  }catch(err){
    next(err);
  }
});
//Route 
app.post("/generate", async(req, res, next) => {
  try{
    const amount = parseFloat(_.get(req, ["body", "amount"]));
    const mobile = testMobile || "0805867399";
    const payload = generatePayload(mobile, { amount });
    const option = {
      color: {
        dark: "#000",
        light: "#fff"
      }
    }
    qr.toDataURL(payload, option, (err, url) => {
     if(err) {
        console.log("generate fail");
        return next(err); 
        //  return res.status(400).json({
        //     coode: 400,
        //     message: "bad: "+ err
        //  });
     }else {
        return res.status(200).json({
          coode: 200,
          message: "good",
          data: url
       });
     }

    });

  }catch(err){
    next(err);
  }

});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log("server is running on port " + port);
});
