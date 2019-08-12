var express = require('express');
var router  = express.Router();
var elastic  =  require('elasticsearch');
var client = elastic.Client({
    host:'localhost:9200',
    log: 'trace'
})
// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
//   }, function (error) {
//     if (error) {
//       console.trace('elasticsearch cluster is down!');
//     } else {
//       console.log('All is well');
//     }
//   });
router.post('/insert',(req,response,next)=>{
    var data =  {
        email:req.body.email,
        name:req.body.name,
        age:req.body.age,
        mobile_no:req.body.mobile
    }
    client.index({
        index:'users_database',
        type:'_doc',
        body:data
    },(err,resp,status)=>{
        if(err){
             return response.status(200).json({
                 message:'An error occured',
                 error:err,
                 success:false
     
             });
         }
        response.status(201).json({
         message:'user added',
         success:true
     });
    })
})
router.get('/getUser/:id',(req,res,next)=>{
    var arr = [];
    client.get({
        index:'users_database',
        type:'_doc',
        id:req.params.id
    },(err,result,status)=>{
        if(err){
            console.log(err);
            return res.status(200).json({
                message:'An error occured',
                error:err,
                success:false
    
            });
        }
        
        var data = {
            _id : result._id,
            email:result._source.email,
            name:result._source.name,
            age:result._source.age,
            mobile_no:result._source.mobile_no
        }
        arr.push(data);
        return res.status(200).json(arr);
    });
})
router.get('/getAll',(req,res,next)=>{
    var data =[]; 
    client.search({
        index: 'users_database',
        type: '_doc',
        scroll: '10s',
       
        body: {
            query: {
                "match_all": {}
            }
        }
    },(err,result)=>{
         if(err)console.log(err)
         else{
            result.hits.hits.forEach((ele) => {
                //console.log(ele);
                var d = {
                    _id : ele._id,
                    email:ele._source.email,
                    name:ele._source.name,
                    age:ele._source.age,
                    mobile_no:ele._source.mobile_no
                }
                data.push(d);
            });
            return res.status(200).json(data);
        }
    })
})
router.get('/deleteUser/:id',(req,res,next)=>{
    client.delete({  
        index: 'users_database',
        id: req.params.id,
        type: '_doc'
      },(error,result,status)=>{
        if(error){
            return res.status(200).json({
                message:'An error occured',
                error:error,
                success:false
    
            });
        }
       res.status(201).json({
        message:'user deleted',
        obj:result,
        success:true
    });
      });
})
router.post('/updateUser',(req,res,next)=>{
    var id ;
    var data;
    client.search({
        index: 'users_database',
        type: '_doc',
        scroll: '10s',
       
        body: {
            query: {
                "match_all": {}
            }
        }
    },(err,result)=>{
         if(err)console.log(err)
         else{
            result.hits.hits.forEach((ele) => {
               if(req.body.email==ele._source.email){
                   id = ele._id;
                    data = {
                       email:req.body.email,
                       name:req.body.name,
                       age:req.body.age,
                       mobile_no:req.body.mobile
                   }
                   client.delete({
                    index:'users_database',
                    type:'_doc',
                    id:id
                },(err1,result)=>{
                   if(err)throw err1;
                   console.log(result);
                });
               }
                
            });
           client.index({
               index:'users_database',
               type:'_doc',
               id:id,
               body:data
           },(err2,result)=>{
            if(err2){
                return res.status(200).json({
                    message:'An error occured',
                    success:false
        
                });
               
            }
            res.status(201).json({
            message:'user updated',
            success:true
        });
           });
        }

    })
})
module.exports = router;