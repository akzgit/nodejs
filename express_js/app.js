const express = require('express');
const app=express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send("Welcome to express session");
});

app.listen(port,()=>{
    console.log(`app is running in http://localhost:${port}`)
});

