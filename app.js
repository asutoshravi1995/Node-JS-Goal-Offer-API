const bodyParser = require('body-parser')
const express=require('express')
const router=require('./routes/routing')
const app=express()
const port=3000

app.use(bodyParser.json())
app.use(router)

app.listen(port,()=>{console.log(`Server running at ${port}`);});


