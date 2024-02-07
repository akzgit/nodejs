const express =require('express');

const app=express();
app.get('/',(req,res)=>{
    // res.sendFile(__dirname + '/testangular.html');
    res.sendFile("C:/Users/Administrator/Desktop/hello.txt")
});

app.listen(3000);

console.log("server up");