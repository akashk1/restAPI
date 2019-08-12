var express = require('express');
var router = express.Router();
var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "C:\Angular\restApi\details.json",
  databaseURL: "https://usersdatabase1.firebaseio.com/"
});  

var db = firebase.database();
var ref = db.ref("/users");  
router.post('/insert',(req,response,next)=>{
    ref.once("value", function(snapshot) {
        var id = snapshot.numChildren();  
        ref.push([
            {
                _id:id,
                name:req.body.name,
                email:req.body.email,
                age:req.body.age,
                mobile_no:req.body.mobile
            }
            ],(err)=>{
                if(err){
                    return response.status(200).json({
                        message:'An error occured',
                        error:error,
                        success:false
            
                    });
                }
                response.status(201).json({
                    message:'user added',
                    success:true
                });
            });
      });
   
})
router.get('/getAll',(req,res,next)=>{
    var data = [];
    ref.once("value",(snap)=>{
      snap.forEach((snapshot)=>{
          data.push(snapshot.val()[0]);
      })
      res.status(200).json(data);
    })
   
})
router.get('/getUser/:id',(req,res,next)=>{
    var id = req.params.id;
    var data =[];
    ref.once("value",(snap)=>{
        snap.forEach((snapshot)=>{
            if(id==snapshot.val()[0]._id){
                data.push(JSON.parse(JSON.stringify(snapshot.val()[0])));
               return res.status(200).json(data);
            }
         
        });
    });
})
router.get('/deleteUser/:id',(req,res,next)=>{
    var id = req.params.id;
    var uid ;
    ref.once("value",(snap)=>{
        snap.forEach((snapshot)=>{
            if(id==snapshot.val()[0]._id){
            uid = snapshot.key;
            ref.child(uid).remove((err)=>{
                if(err){
                    return res.status(200).json({
                        message:'An error occured',
                        error:err,
                        success:false
            
                    });
                }
            
                res.status(201).json({
                message:'user deleted',
                success:true
            });
            });
           
        }
        });
       
    });
})
router.post('/updateUser',(req,res,next)=>{
    var email = req.body.email;
    var name = req.body.name;
    var age  = req.body.age;
    var mobile_no = req.body.mobile;
    ref.once("value",(snap)=>{
        snap.forEach((snapshot)=>{
            if(snapshot.val()[0].email===email){
               // console.log(req.body);
                var data = {
                    _id:snapshot.val()[0]._id,
                    email:email,
                    name:name,
                    age:age,
                    mobile_no:mobile_no
                }
                console.log(data);
               ref.child(snapshot.key).update(data,(err)=>{
                if(err){
                    return res.status(200).json({
                        message:'An error occured',
                        success:false
            
                    });
                   
                }
                res.status(201).json({
                message:'user updated',
                success:true
            });
               })
            }
        })
    })

})
module.exports = router;