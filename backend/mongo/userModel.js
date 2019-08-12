var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=Schema(
    {
        email:{type:String ,required:true ,unique:true },
        name:{type:String ,required:true},
        age:{type:Number,required:true},
        mobile_no:{type:Number,required:true ,unique:true}
    }
)
module.exports=mongoose.model('User',userSchema,'users');