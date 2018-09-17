var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');

/* GET home page. */

router.get('/', async function (req, res, next) {
    let page = req.query.page
    let rows = req.query.rows
    let name = req.query.username
    let type = req.query.type
    let text = req.query.text
    let obj = { page, rows, findType: "exact" }
    obj.username = name
    console.log(obj)
    if (type) {
        obj[type] = text
        // console.log(text)
    }
    let data = await client.get('/shop', obj);

    console.log(data)
    res.send(data)

});
router.get('/goods', async function (req, res, next) {
    let name = req.query.username
    let data = await client.get('/goods', { username: name, findType: "exact" });
    res.send(data)
    console.log(data)
});
router.put('/goods/:id', async function (req, res, next) {
    // let name=req.query.username
    // let data = await client.get('/goods',{username:name,findType:"exact"});
    // res.send(data)
    // console.log(data)
    let id = req.params.id
    let body = req.body;
    let goods;
    let data = await client.get('/shop/' + id)
    let arr = data.goods ? data.goods : [];

    for (let i = 0; i < body.length; i++) {
        goods = { $ref: "goods", $id: body[i]._id }
        console.log(data, goods)
        // console.log(_.indexOf(arr, goods))

        let obj = {}
        arr = arr.concat(goods)
        arr = arr.reduce((cur, next) => {
            obj[next.$id] ? "" : obj[next.$id] = true && cur.push(next);
            return cur;
        }, [])
        await client.put('/shop/' + id, { goods: arr })


    }
    // let _id=req.body._id;
    // 
    // console.log(body,_id,id)
    // 
    res.send("suc")
});
router.get('/service', async function (req, res, next) {
    let name = req.query.username
    let data = await client.get('/service', { username: name, findType: "exact" });
    res.send(data)
});
router.put('/service/:id', async function (req, res, next) {
    // let name=req.query.username
    // let data = await client.get('/goods',{username:name,findType:"exact"});
    // res.send(data)
    // console.log(data)
    let id = req.params.id
    let body = req.body;
    let goods;
    let data = await client.get('/shop/' + id)
    let arr = data.service ? data.service : [];
    for (let i = 0; i < body.length; i++) {
        service = { $ref: "service", $id: body[i]._id }
        console.log(data, service)
        // console.log(_.indexOf(arr, goods))

        let obj = {}
        arr = arr.concat(service)
        arr = arr.reduce((cur, next) => {
            obj[next.$id] ? "" : obj[next.$id] = true && cur.push(next);
            return cur;
        }, [])
        await client.put('/shop/' + id, { service: arr })


    }
    // let _id=req.body._id;
    // 
    // console.log(body,_id,id)
    // 
    res.send("suc")
});

router.get('/SeeCommodity/:id', async function (req, res, next) {
    let id = req.params.id
    console.log(id)
    let data = await client.get('/shop/' + id);
    // res.send(data)
    let arr = [];
    for (let i = 0; i < data.goods.length; i++) {
        let goodsData = await client.get('/goods/' + data.goods[i].$id);
        arr.push(goodsData)
    }
    res.send(arr)
});

router.get('/SeeService/:id', async function (req, res, next) {
    let id = req.params.id
    console.log(id)
    let data = await client.get('/shop/' + id);
    // res.send(data)
    let arr = [];
    for (let i = 0; i < data.service.length; i++) {
        let serviceData = await client.get('/service/' + data.service[i].$id);
        arr.push(serviceData)
    }
    res.send(arr)
});

router.post('/ShelvesGoods/:id', async function (req, res, next) {
    let ShopId = req.params.id
    let data = await client.get('/shop/' + ShopId);
    let arr = [];
    for (let i = 0; i < req.body.length; i++) {
        let goodsID = req.body[i]._id
        let evens = _.remove(data.goods, function (n) {
            return n.$id == goodsID;
        });
    }
    console.log(arr)
    await client.put('/shop/' + ShopId, { goods: data.goods });
    // let newData = await client.get('/shop/' + ShopId);
    res.send("suc")
});

router.post('/ShelvesServe/:id', async function (req, res, next) {
    let ShopId = req.params.id
    let data = await client.get('/shop/' + ShopId);
    let arr = [];
    for (let i = 0; i < req.body.length; i++) {
        let serviceID = req.body[i]._id
        let evens = _.remove(data.service, function (n) {
            return n.$id == serviceID;
        });
    }
    console.log(data)
    await client.put('/shop/' + ShopId, { service: data.service });
    // let newData = await client.get('/shop/' + ShopId);
    res.send("suc")
});

module.exports = router;
