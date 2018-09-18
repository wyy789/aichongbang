var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');
const multiparty = require("multiparty")
// 首页
router.get("/member", async function (req, res, next) {
    let type = req.query.type
    let text = req.query.text
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    let obj = { page, rows }
    if (type) {
        obj[type] = text
    }
    let data = await client.get("/member", obj)
    res.send(data)
})
// 删除
router.delete("/deleteber/:id", async function (req, res, next) {
    let id = req.params.id
    // console.log(id)
    await client.delete("/member/" + id)
    res.send("success")
})
// 搜索
router.get("/search", async function (req, res, next) {
    let type = req.query.type
    let text = req.query.text
    let page = parseInt(req.query.page)
    let rows = parseInt(req.query.rows)
    let obj = { page, rows }
    if (type) {
        obj[type] = text
    }
    let data = await client.get("/member", obj)
    res.send(data)
})
// 增加
router.post("/add", async function (req, res, next) {
    let data = req.body
    await client.post("/member", data)
    res.send("success")
})

// 修改
router.put('/update/:id', async function (req, res, next) {
    let id = req.params.id;
    let body = req.body;
    await client.put('/member/' + id, body)
    res.send("success")
});

// 图片上传
router.post('/addImg', function (req, res) {
    let form = new multiparty.Form({ uploadDir: './public/upload' });
    form.parse(req, function (err, fields, files) {
        
        if (err) {
            res.send(err);
        } else {
            console.log("22",files)
            res.send(files.file[0].path.replace("public", "").replace(/\\/g, "/"));
        }
    })
})
module.exports = router;