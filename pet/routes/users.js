var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');

/* GET users listing. */
router.post("/huoqu", async function (req, res, next) {
  let data = await client.get("/users")
  for (let i = 0; i < data.length; i++) {
    if (data[i].userType == "平台管理") {
      data.splice(i, 1)
    }
  }
  res.send(data);
})

router.post("/yonghu", async function (req, res, next) {
  res.send(req.session.user);
})

router.post("/zhuxiao", async function (req, res, next) {
  req.session.user = null
  res.send('成功');
})

router.post("/yanzheng", async function (req, res, next) {
  if (req.session.user) {
    res.send({ use: true })
  } else {
    res.send({ use: false })
  }
})

router.post("/shenghe", async function (req, res, next) {
  let obj = req.body;
  let _id = obj.row._id
  await client.put('/users/' + _id, {
    userStatus: obj.text
  });
  let data = await client.get("/users/" + _id)
  res.send(data);
})

router.post("/shanchu", async function (req, res, next) {
  let obj = req.body;
  let _id = obj._id;
  let data = await client.get("/users/" + _id)
  await client.delete("/users/" + _id)
  res.send(data);
})

router.post("/chaxun", async function (req, res, next) {
  let obj = req.body;
  console.log(obj)
  let data;
  if (obj.type == "userAcount") {
     data = await client.get('/users', { userAcount: obj.text });
  } else if (obj.type == "userPhone") {
     data = await client.get('/users', { userPhone: obj.text });
  } else {
     data = await client.get('/users', { userName: obj.text });
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].userType == "平台管理") {
      data.splice(i, 1)
    }
  }
  res.send(data);
})

module.exports = router;
