var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');

//获取
router.get("/order", async function (req, res, next) {
    // console.log(req.query.type)
    // let query = req.query
    let type=req.query.type
    let value=req.query.value
    let page=parseInt(req.query.page)
    let rows=parseInt(req.query.rows)
    // console.log(type,"type")
    // console.log(value,"value")
    let obj={rows,page}
    if (value) {
        obj[value] = type;
    }
    let data = await client.get("/order", obj)
    res.send(data)
    // console.log(data)
})
//删除
router.delete("/deleteorder/:id",async function(req, res, next){
    let id=req.params.id;
    // console.log(id)
    await client.delete("/order/"+id)
    res.send("suc")
})
//搜索
router.get("/serach",async function(req, res, next){
    let type=req.query.type
    let value=req.query.value
    let page=parseInt(req.query.page)
    let rows=parseInt(req.query.rows)
    // console.log(type,"type")
    // console.log(value,"value")
    let obj={rows,page}
    if (value) {
        obj[value] = type;
    }
    let s=await client.get("/order",obj)
    res.send(s)
    // console.log(s)
})
module.exports = router;