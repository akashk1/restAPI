var mysql = require('mysql');
var express = require('express');
var app = express();
var sql = require('./backend/sql/sql');
var bodyparser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyparser.json());

var port = 3000;
app.use('/',sql);
app.listen(port,(req,res)=>
{
console.log(`Running in port ${port}`);
});