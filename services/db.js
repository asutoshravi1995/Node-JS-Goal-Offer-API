const Connection=require('../utilities/connection')
let db={}
    db.findall=async()=>{
        return new Promise((resolve,reject) => {
             Connection.query("select * from offers;", (err, rows, _field) => {
                if (!err) {
                    resolve(rows)
                }
                else {console.log("Error while fetching");}
                reject(err)
            });
        })
    }

    db.checkUser=(userid)=>{
        return new Promise((resolve,reject)=>{
            Connection.query(`select * from users where userId=${userid}`, (err,rows,_field)=>{
                    if(!err){
                        if(rows.length>0){
                            resolve(rows)
                        }
                        else{
                            reject(false) }
                    }
            })
        })
    }

    db.findoffer=async(offerid)=>{
        return new Promise((resolve,reject) => {
             Connection.query( `select * from offers where offerId=${offerid};`, (err, rows, _field) => {
                if (!err) {
                    resolve(rows)
                }
                else {console.log("Error while fetching");}
                reject(err)
            });
        })
    }
db.add=async(userid,offerid)=>{
    try{
        return new Promise(async(resolve,reject)=>{
            db.checkUser(userid)
            .then(async(userDetail)=>{
                let offerDetail=await db.findoffer(offerid)
                    if(offerDetail && offerDetail.length>0){
                        Connection.query(`INSERT INTO users_and_offers (userId,offerId) VALUES (${userid},${offerid});`,(err,rows,_field)=>{
                            if(!err){
                                let offer_points=offerDetail[0].offer_value;
                                let user_point=userDetail[0].total_cash_earned + offer_points
                                Connection.query(`UPDATE users SET total_cash_earned=${user_point} WHERE userId=${userid}`,(err,row,_field)=>{
                                    if(!err){
                                        resolve(JSON.stringify({ data:user_point, status:"Sucess", message:"Offer is claimed"}))
                                    }
                                    else{
                                        reject(JSON.stringify({ data:null, status:"Failed", message:"Offer already has been claimed"}))
                                    }
                                })
                            }
                            else{
                                console.log("Test1"+err.message)
                                reject(JSON.stringify({ data:null, status:"Failed", message:"Offer already has been claimed"}))
                            }
                        })
                    }
                    else{
                        reject(JSON.stringify({ data:null, status:"Failed", message:"Wrong Offer Id"}))
                    }
            
            })
            .catch((err)=>{
                console.log(".catch working")
                reject(JSON.stringify({ data:null, status:"Failed", message:"Wrong User ID"}))
                }
            ) 
        })
    
    }
    catch(err){
        console.log("Error at main try")
        throw err
    }
}

// db.add(1005,106)
// console.log("runnung")
module.exports=db