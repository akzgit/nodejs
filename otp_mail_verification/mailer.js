const nodemailer = require('nodemailer'); //import nodemailer
const { generate } = require('otp-generator');
const object=require("./index.js")

//creating a nodemailer transporter with gmail smtp settings
transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",  //SMTP Server hostname for Gmail
    port:465,   //SMTP port for secure connection
    secure:true, //secure connection SSL
    auth:{
        user:'akashtyo@gmail.com',
        pass:'xnrp hwhy iclz fdsi'
    }
})

//define the email details and content

mail ={
    from:'akashtyo@gmail.com',
    to:'akashtyo@gmail.com',
    subject:'OTP',
    text:'Hello user , Welcome to our ADIT course! \n\n'
    +`Your OTP for signin is : ${genotp()}`
}

//send mail

transporter.sendMail(mail,(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
})