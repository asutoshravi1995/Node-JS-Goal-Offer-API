const mysql=require('mysql2')

var mysqlconnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Holi@1112",
    database:"goals101"
})

mysqlconnection.connect((err)=>{
    if(!err){console.log("Connected");}
    else{
        console.log("Error while connecting");
        throw new Error("Database connectivity failed").status(500)
    }   
})

module.exports=mysqlconnection