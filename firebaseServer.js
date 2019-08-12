var express = require('express');
var cors = require('cors');
var app = express();
var routes = require('./backend/firebase/firebase');
var bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());
app.use('/',routes);
const port=process.env.PORT || 3000;
app.listen(port,(req,res)=>
{
console.log(`Running in port ${port}`);
});