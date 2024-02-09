const express=require("express");
const app= express();
const port= 3000;

//setting the view engine for pug template
app.set('view engine', 'pug');
app.use(express.static('public')); //add the static files inside the public folder
//route for the view engine

app.get('/',(req,res)=>{

    res.render('index',{title:'express with pug template engine',message:"welcome to pug world"});

})

//start the server
app.listen(port,()=>{
    console.log(`app is running in http://localhost:${port}`)
})