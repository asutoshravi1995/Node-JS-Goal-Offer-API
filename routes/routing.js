const express=require('express')
const routing=express.Router()
const Connection=require('../utilities/connection')
const db= require('../services/db')

routing.get('/offers',async(req,res,next)=>{
    let userId=req.query.uid
    let offerId=req.query.offerid
    if(userId && !offerId && !isNaN(userId)){
        try{
                db.checkUser(userId)
                .then(async(userDetail)=>{
                    console.log(userDetail);
                    let rows=await db.findall()
                            if(rows && rows.length>0){
                                //console.log(rows)
                                let offerObj={
                                                data:rows,
                                                status:"success",
                                                message:"Offers fetched Successfull"
                                            }
                                let offerJson=JSON.stringify(offerObj)
                                //console.log(offerJson)
                                res.send(offerJson)
                            }
                            else{ console.log("No Data found") }
                })
                .catch((err)=>{
                    res.send(JSON.stringify({ data:null, status:"Failed", message:"Wrong User ID"})) 
                    }
                    )     
        }
        catch(err){
            console.log("value"+err.message)
        }        
    }
    else{ next() }
    
})

routing.get('/offers',async(req,res,next)=>{
    let offerId=req.query.offerid
    let userId=req.query.uid
    if(!userId && offerId && !isNaN(offerId)){
        try{
                    let rows=await db.findoffer(offerId)
                        if(rows && rows.length>0){
                                let offerObj={
                                                data:rows,
                                                status:"success",
                                                message:"Offers fetched Successfull"
                                            }
                                let offerJson=JSON.stringify(offerObj)
                                //console.log(offerJson)
                                res.send(offerJson)
                            }
                        else{ res.send(JSON.stringify({ data:null, status:"Failed", message:"Wrong offer ID"})) }
        }
        catch(err){
            console.log("value"+err.message)
        }        
    }
    else{ next() }
    
    
})

routing.post('/claim',async(req,res,next)=>{
    let userId=req.body.uId
    let offerId=req.body.offerId
    if(userId && !isNaN(userId) && offerId && !isNaN(offerId) ){
        try{
            
           await db.add(userId,offerId)
           .then((result)=>{
               res.send(result)
           })
           .catch((err)=>{
               res.send(err)
           })
        }
        catch(err){
            console.log("Error "+err.message);
        }
    }
    else{
        next()
    }
})

routing.all('/*',(req,res)=>{
    res.send(JSON.stringify({ data:null, status:"Failed", message:"Something went Wrong check your URL"}))
})




module.exports=routing