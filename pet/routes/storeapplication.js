var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');
const multiparty=require("multiparty")

// 申请门店
router.post("/addStore",async function(req,res,next){
    let data = req.body
    console.log(data)
    await client.post("/shop", data);
    res.send("success");
})
// 增加图片
router.post('/addImg', function (req, res, next) {
    console.log(111)
   let form = new multiparty.Form({
       uploadDir: './public/upload'
   });
   console.log(222)
   form.parse(req, function (err, fields, files) {
       console.log(222)
       if (err) {
           res.send(err);
       } else {
           console.log(files)
           console.log(files.file[0].path.replace("public", "").replace(/\\/g, "/"))
           res.send(files.file[0].path.replace("public", "").replace(/\\/g, "/"));
       }
   })
})
module.exports = router;