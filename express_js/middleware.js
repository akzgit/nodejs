const express=require("express");
const app= express();
const port=3000;

//created a middleware variable to define a function for middleware
const loggerMiddleware=(req,res,next)=>{
    console.log(`Request URL:${req.url}`);
    next();
};

//registered our middleware
app.use(loggerMiddleware);

//route handler function
app.get('/',(req,res)=>{
    res.send("Welcome to express session");
});


app.listen(port,()=>{
    console.log(`app is running in http://localhost:${port}`)
});