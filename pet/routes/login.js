var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();

client.url('localhost:8081');

router.post("/reg", async function (req, res, next) {
    let data = req.body
    await client.post("/users", data)
    res.send('成功');
})

router.post("/login", async function (req, res, next) {
    let obj = req.body;
    let use;
    let isuse = false;
    let shenghe;
    let data = await client.get("/users")
    for (let i = 0; i < data.length; i++) {
        if (data[i].userAcount == obj.userAcount && data[i].userPwd == obj.userPwd) {
            use = data[i]
            isuse = true
        }
    }
    if (use) {
        req.session.user = { userPhone: use.userPhone }
        res.send({
            isuse,
            userType: use.userType,
            shenghe: use.userStatus
        });
    } else {
        res.send({
            isuse,
        });
    }
})

router.post("/panduan", async function (req, res, next) {
    let obj = req.body
    let use = true
    let data = await client.get("/users")
    for (let i = 0; i < data.length; i++) {
        if (data[i].userPhone == obj.userPhone) {
            use = false;
        }
    }
    res.send(use);
})

module.exports = router;