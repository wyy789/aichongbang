var express = require('express');
var _ = require("lodash")
const client = require("ykt-http-client");
var router = express.Router();
client.url('localhost:8081');


module.exports = router;