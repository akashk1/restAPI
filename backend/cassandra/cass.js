var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], localDataCenter: 'datacenter1', keyspace: 'users_database' });


router.post('/insert',(req,response,next)=>{
    var q = 'select count(*) from user';
    client.execute(q,(err,result) => {
    var id= (JSON.parse(JSON.stringify(result.rows[0].count)));
    id = (id-'0');
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var mobile = req.body.mobile;
    const query = 'INSERT INTO user ("_id",email,name,age,mobile_no) VALUES (?,?,?,?,?)';
    var data = [id,email,name,age,mobile];
    client.execute(query,data,{ hints : ['int','varchar','varchar','tinyint','int'] },(error,res)=>{
        if(error){
           // console.log(error);
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
    })
       
  });
 
  });
  router.get('/getAll',(req,res,next)=>{
      var query = 'select * from user';
      client.execute(query,(err,result)=>{
        if(err){
            return res.status(200).json({
                title:'An error occured',
                error:err,
                success:false
    
            });
        }
        res.status(200).json(result.rows);
      })
  })
  router.get('/getUser/:id',(req,res,next)=>{
    var id = req.params.id;
        var query  = 'select * from user where "_id"= ?';
        client.execute(query,[id],{hints:['int']},(error,result,fields)=>{
            if(error){
                return res.status(200).json({
                    message:'An error occured',
                    error:error,
                    success:false
        
                });
            }
            res.send(result.rows);
        })
        
    
    })
    router.get('/deleteUser/:id',(req,res,next)=>{
        var id = req.params.id;
            var query  = 'delete from user where "_id" = ?';
            client.execute(query,[id],{hints:['int']},(error,result,fields)=>{
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
    var query = 'select "_id" from user where email=? allow filtering';
    client.execute(query,[email],{hints:['varchar']},(err,res1)=>{
    if(err)console.log(err); 
    var id = (res1.rows[0]._id);
    var sql  ='update user set name=?,age=?,mobile_no=? where "_id"=? and email =? '
    var data = [name,age,mobile_no,id,email];
    client.execute(sql,data,{hints:['varchar','tinyint','int','int','varchar']},(error,result)=>{
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
    

})


  module.exports = router;