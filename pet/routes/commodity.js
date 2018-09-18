var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');
const multiparty=require("multiparty")

// 获取数据
router.get("/goods", async function (req, res, next) {
    let type = req.query.type;
    let text = req.query.text;
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    let userName = req.query.userName;
    let obj = {
        page,
        rows,
        userName
    };
    if (text) {
        obj[type] = text
    }
    let data = await client.get("/goods", obj);
    res.send(data);
})
// 增加商品
router.post("/addGoods", async function (req, res, next) {
    let data = req.body
    await client.post("/goods", data);
    res.send("success");
})
// 增加图片
router.post('/upload', function (req, res, next) {
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
// 删除商品
router.delete("/deleteGoods/:id", async function (req, res, next) {
    let id = req.params.id
    console.log(id)
    await client.delete("/goods/"+id);
    res.send("success");
})
// // 修改商品信息
// router.get("/:id", async function (req, res, next) {
//     let id = req.params.id;
//     let data = await client.get('/goods/' + id);
//     res.send(data);
// })
// 修改信息后保存到数据库
router.put('/change', async function (req, res, next) {
    let id = req.body._id;
    let data=req.body
    delete data._id;
    await client.put("/goods/" + id, req.body);
    res.send("success");
})
// 对应用户的商品列表
router.get("/storeGoods",async function(req,res,next){
    let userName=req.query.userName
    let data = await client.get("/goods")
    console.log(data)
    let arr=[]
    for(let i=0;i<data.length;i++){
        if(data[i].userName==userName){
            arr.push(data[i])
        }
    }
    console.log(arr)
    res.send(arr)
})
module.exports = router;