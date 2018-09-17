var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');

/* GET home page. */

router.get('/', async function (req, res, next) {
    let page = req.query.page
    let rows = req.query.rows
    let type=req.query.type
    let text=req.query.text
    let obj={page,rows}
    if(type){
        obj[type]=text
        // console.log(text)
    }
    let data = await client.get('/shop', obj);
    res.send(data)
    // console.log(data)
});

router.put('/:id', async function (req, res, next) {
    let id = req.params.id;
    let body = req.body;
    await client.put('/shop/' + id, body)
    res.send("suc")
});

router.put('/update/:id', async function (req, res, next) {
    let id = req.params.id;
    let body = req.body;
    await client.put('/shop/' + id, body)

    res.send("suc")
});


module.exports = router;
