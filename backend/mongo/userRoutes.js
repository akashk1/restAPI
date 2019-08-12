var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');
var User=require('./userModel');
router.get('/getAll',(req,res,next)=>
{
 
    User.find({},(err,allUsers)=>
    {
      if(err)
      {
        console.log("there is error in getting list");
        res.send({success:"Failed to get List",status:500});
      }
    
      res.status(200).json(allUsers);
    });
});
router.post('/insert',(req,res,next)=>{
    var user =new User({
        email:req.body.email,
        name:req.body.name,
        age:req.body.age,
        mobile_no:req.body.mobile
    });
    user.save((err,result)=>{
        if(err){
            return res.status(200).json({
                title:'An error occured',
                error:err,
                success:false
    
            });
        }
        res.status(201).json({
            message:'user added',
            obj:user,
            success:true
        });
        
    })
})
router.get('/getUser/:id',(req,res,next)=>{
     
    var id = {_id:req.params.id};
   // console.log(id);
    User.find(id,(err,user)=>{
        if(err){
            return res.status(200).json({
                title:'An error occured',
                error:err,
                success:false
    
            });
        }
       res.send(user);

    })
})
router.get('/deleteUser/:id',(req,res,next)=>{
    var id ={_id:req.params.id};
    User.findOneAndDelete(id,(err,result)=>{
       if(err){
           return res.status(200).json({
               title:'error occured',
               error:err,
               success:false
           });
       }
       res.status(201).json({
           message:'User deleted',
           obj:result,
           success:true
       });
    });
});
router.post('/updateUser',(req,res,next)=>{
    var email = req.body.email;
    var name  = req.body.name;
    var age = req.body.age;
    var mobile = req.body.mobile;
    var user = {
        email:email,
        name:name,
        age:age,
        mobile_no:mobile
    }
    console.log(user);
    User.findOneAndUpdate({email:email},user,(err,result)=>{
        if(err){
            res.status(200).json({
             title:'error occured',
             error:err,
             success:false
            });
        }
        res.status(201).json({
            message:'User updated',
            obj:result,
            success:true
        });
    });
});


module.exports=router;

   
