const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");  //it helps us to manage environment variables which basically consists of sensitive data in a secure way 

const app = express();
const port =3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const route = express.Router();

//create a reusable transporter object using the default proctocol SMTP transport
const transporter = nodemailer.createTransport({
    port:465,
    host:"smtp.gmail.com",
    auth:{
        user:'akashtyo@gmail.com',
        pass:'gign gdhx kopu mkxm',
    },
    secure:true,
});

route.post('/expmail',(req,res)=>{
    const{to,subject,text}=req.body;
    const mailinfo={
        from:'akashtyo@gmail.com',
        to:to,
        subject:subject,
        text:text,
        // to:'akashtyo@gmail.com',
        // subject:'Sending email using Expresss Node JS',
        // text:'Hurray it was an easy application',
        // html:'<h1>Hello User, We have been successfully able to send an email for the very first time.</h1>',
        // html:'<h1>Hello User, We have been successfully able to send an email for the second time.</h1>',
    };

    transporter.sendMail(mailinfo,function(err,info){
        if(err)
           return console.log(err);
        else
           res.status(200).send({message:"Mail send", message_id:info.message})
    });
});

app.use('/api', route);
app.listen(port,()=>{
    console.log(`Server listening on the port ${port}`);
});