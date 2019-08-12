
var express=require('express');
var mongoose=require('mongoose');

var bodyparser=require('body-parser');
var cors=require('cors');
var UserRoutes=require('./backend/mongo/userRoutes');

var app=express();
app.use(cors())
mongoose.connect(' mongodb://test:test123@ds255857.mlab.com:55857/user',{
    useCreateIndex: true,
    useNewUrlParser: true
  });
 
app.use(bodyparser.json());
app.use('/',UserRoutes);
const port=process.env.PORT || 3000;
app.listen(port,(req,res)=>
{
console.log(`Running in port ${port}`);
});