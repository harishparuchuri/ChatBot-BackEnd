const express=require('express')

function createRouter(db){
    const router=express.Router()


    router.get('/', (req, res) => {
        res.json({
            message: 'PizzaBot Backend Running Fine'
        });
    });
    //Get Message Data From Data Base
    router.get('/data',function(req,res,next){
        db.query(
            'SELECT * FROM conversation',
            (error,results)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:"error"})
                }
                else{
                    res.status(200).json(results)
                }
            }
        );
    });

    //Get User Data
    router.get('/user',function(req,res,next){
        db.query(
            'SELECT * FROM users',
            (error,results)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:"error"})
                }
                else{
                    res.status(200).json(results)
                }
            }
        );
    });

    //post User Details
    router.post('/user',(req,res,next)=>{
        db.query(
            'insert into users(name,Email,PhoneNo) VALUES (?,?,?)',
            [req.body.name,req.body.Email,req.body.PhoneNo],
            (error)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:'Unable to Post Data'});
                }
                else{
                    res.status(200).json({status:'ok'});
                }
            } 
            
            );
    });

    //Get Order Details from BD
    router.get('/order',function(req,res,next){
        db.query(
            'SELECT * FROM orderdetails',
            (error,results)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:"error"})
                }
                else{
                    res.status(200).json(results)
                }
            }
        );
    });
    // Get Order Details By Order ID
    router.get('/order/:orderid', function (req, res, next) {
        db.query(
          'SELECT * FROM orderdetails WHERE OrderId=?',
          [req.params.orderid],
          (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({status: 'error'});
            } else {
                // console.log("results",results);
                
              res.status(200).json(results);
            }
          }
        );

      });

    //   Post orderdetails to DB

    router.post('/order',(req,res,next)=>{
        db.query(
            'insert into orderdetails(OrderId,itemName,OrderDescription,Price,UserEmailId,OrderStatus) VALUES (?,?,?,?,?,?)',
            [   req.body.OrderId,
                req.body.itemName,
                req.body.OrderDescription,
                req.body.Price,
                req.body.UserEmailId,
                req.body.OrderStatus
            
            ],
            (error)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:'Unable to Post Data'});
                }
                else{
                    res.status(200).json({status:'ok'});
                }
            } 
            
            );
    });

    // Update Order Status
    router.put('/order/:orderid',function(req,res,next){
        db.query(
            'UPDATE orderdetails SET OrderStatus= ? WHERE OrderId=?',
            [req.body.OrderStatus,req.params.orderid,],
            (error)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:'unable to update'});
                }
                else{
                    res.status(200).json({status:'Updated'});
                }
            }

        );
    });



    // Get Message Data
    router.get('/message',function(req,res,next){
        db.query(
            'SELECT * FROM message',
            (error,results)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:"error"})
                }
                else{
                    res.status(200).json(results)
                }
            }
        );
    });

    // Get options Data
    router.get('/options',function(req,res,next){
        db.query(
            'SELECT * FROM options',
            (error,results)=>{
                if(error){
                    console.log(error);
                    res.status(500).json({status:"error"})
                }
                else{
                    res.status(200).json(results)
                }
            }
        );
    });



    return router;
}
module.exports = createRouter;
