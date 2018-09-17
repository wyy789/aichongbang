var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');

router.get("/member",async function(req,res,next){
   let parse=req.query
//    console.log(parse)
    let data=await client.get("/member",parse)
    res.send(data)
})

router.delete("/deleteber/:id",async function(req,res,next){
    let id=req.params.id
    // console.log(id)
     await client.delete("/member/"+id)
     res.send("success")
 })

 router.get("/search",async function(req,res,next){
    let type=req.query.type
    let text=req.query.text
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    let obj={page, rows}
    if(type){
        obj[type]=text
    }
    console.log(obj)
    let data= await client.get("/member",obj)
     res.send(data)
 })

router.post("/add",async function(req,res,next){
    let data=req.body
    // console.log(data)
     await client.post("/member",data)
     res.send("success")
 })
module.exports = router;