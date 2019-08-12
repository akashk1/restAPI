var express=require('express');
var router=express.Router();
var pg = require('pg');
var bodyparser=require('body-parser');
var conString = "postgres://mryeuqdf:u0HBbQqTcs8owUGS51DqDe_qKDkgrO8a@raja.db.elephantsql.com:5432/mryeuqdf" 
var con = new pg.Client(conString);
con.connect((err)=>{
    if(err) console.log(err);
})

router.get('/getAll',(req,res,next)=>{
    var sql = "select * from users";
  con.query(sql,(error,result,fields)=>{
    if(error){
        return res.status(200).json({
            title:'An error occured',
            error:err,
            success:false

        });
    }
    res.status(200).json(result.rows);
    console.log(result[0]);
  
  })

})
router.get('/getUser/:id',(req,res,next)=>{
var id = req.params.id;
    var sql  = "select * from users where _id="+id;
    con.query(sql,(error,result,fields)=>{
        if(error){
            return res.status(200).json({
                message:'An error occured',
                error:error,
                success:false
    
            });
        }
       // console.log(result);

       res.send(result.rows);
    })
    

})
router.post('/insert',(req,res,next)=>{
var email = req.body.email;
var name = req.body.name;
var age  = req.body.age;
var mobile_no = req.body.mobile;

    var values = 
        [email,name,age,mobile_no]
    var sql = 'insert into  users  (email,name,age,mobile_no) values ($1,$2,$3,$4)';
    con.query(sql,values,(error,result,fields)=>{
        if(error){
            console.log(error);
            return res.status(200).json({
                message:'An error occured',
                error:error,
                success:false
    
            });
        }
       // console.log(result);

       res.status(201).json({
        message:'user added',
        success:true
    });
    })
   
})
router.get('/deleteUser/:id',(req,res,next)=>{
var id = req.params.id;
    var sql  = "delete from users where _id="+id;
    con.query(sql,(error,result,fields)=>{
        if(error){
            return res.status(200).json({
                message:'An error occured',
                error:error,
                success:false
    
            });
        }
       // console.log(result);

       res.status(201).json({
        message:'user deleted',
        obj:result,
        success:true
    });
    })
    

})
router.post('/updateUser',(req,res,next)=>{
var email = req.body.email;
var name = req.body.name;
var age  = req.body.age;
var mobile_no = req.body.mobile;
    var sql  ="update users set name=$1,age=$2,mobile_no=$3 where email=$4"
    var data = [name,age,mobile_no,email];
    con.query(sql,data,(error,result,fields)=>{
        if(error){
            return res.status(200).json({
                message:'An error occured',
                success:false
    
            });
        }
       // console.log(result);

       res.status(201).json({
        message:'user updated',
        obj:result.rows,
        success:true
    });
    })
    

})

module.exports = router;