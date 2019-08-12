var pg = require('pg');
var express  = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var routes = require('./backend/postgreSQL/pg');
var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use('/',routes);
const port=process.env.PORT || 3000;
app.listen(port,(req,res)=>
{
console.log(`Running in port ${port}`);
});