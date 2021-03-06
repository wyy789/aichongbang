var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');


//获取
router.get("/service",async function (req,res,next) {
    // console.log(123123)
    let type = req.query.type;
    let text = req.query.text;
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    let userName = req.query.userName;
    let obj={page,rows,userName};
    if(text){
        obj[type]=text
    }
    // console.log("obj",obj)
    let data = await client.get("/service",obj);
    // console.log("data",data)
    res.send(data);
})

//删除
router.delete("/deleteSer/:id",async function (req,res,next) {
    let id = req.params.id;
    // console.log(id);
    await client.delete("/service/"+id);
    res.send("success");
})

//增加
router.post("/addSer",async function (req,res,next) {
    let data = req.body;
    // console.log(data);
    await client.post("/service",data);
    res.send("success");
})
//修改
router.put("/putSer",async function (req,res,next) {
    let data = req.body;
    let id = data._id;
    delete data._id;
    // console.log(data,id)
    await client.put("/service/"+id,data);
    res.send("success");
})



module.exports = router;