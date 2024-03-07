// const express=require('express');
// const otpgen=require("otp-generator");
// const ejs=require("ejs")
// const app=express();
// const nodemailer = require('nodemailer'); //import nodemailer
// const { generate } = require('otp-generator');
// const port =3000;


// app.set('view engine',ejs);
// app.use(express.urlencoded({extended:true}))


// genotp = ()=>{
//     OTP= otpgen.generate(6,{digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
//     console.log(OTP)
//     return OTP;
// }

//genotp()

// // app.get('/',(req,res)=>{
// //     res.send(`<h1>Your OTP is: </h1>` +genotp());
// // });
// const otp_mail=genotp();

// app.get('/',(req,res)=>{
//     res.render('verify.ejs');
// })

// app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`)
//     // console.log(genotp())
// });

// module.exports=genotp;

// app.post('/verify',async(req,res)=>{
//     userOTP=req.body.userotp
//     if(userOTP===otp_mail){
//         res.send('your OTP is successfully verified')
//     }
//     else{
//         res.send("Your OTP is incorrect");
//     }
// })

// //creating a nodemailer transporter with gmail smtp settings
// transporter = nodemailer.createTransport({
//     host:"smtp.gmail.com",  //SMTP Server hostname for Gmail
//     port:465,   //SMTP port for secure connection
//     secure:true, //secure connection SSL
//     auth:{
//         user:'akashtyo@gmail.com',
//         pass:'xnrp hwhy iclz fdsi'
//     }
// })

// //define the email details and content

// mail ={
//     from:'akashtyo@gmail.com',
//     to:'akashtyo@gmail.com',
//     subject:'OTP',
//     text:'Hello user , Welcome to our ADIT course! \n\n'
//     +`Your OTP for signin is : ${otp_mail}`
// }

// //send mail

// transporter.sendMail(mail,(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//     }
// })


const express = require('express');
const otpGenerator = require("otp-generator");
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({extended: true}));

// Generate OTP function
let otp_mail = ""; // Initialize OTP variable
function generateOtp() {
    return otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false});
}

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'akashtyo@gmail.com', // Replace with your email
        pass: 'xnrp hwhy iclz fdsi' // Replace with your email password or app specific password
    }
});

// Function to send email with OTP
function sendOtpEmail(otp) {
    const mailOptions = {
        from: 'akashtyo@gmail.com', // Replace with your email
        to: 'akashtyo@gmail.com', // Replace with the recipient's email
        subject: 'OTP Verification',
        text: `Hello, your OTP for verification is: ${otp}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending mail:', err);
        } else {
            console.log('Mail sent:', info.response);
        }
    });
}

// Route to display OTP form
app.get('/', (req, res) => {
    res.render('verify');
});

// Route to verify OTP
app.post('/verify', async (req, res) => {
    const userOTP = req.body.userotp;
    if (userOTP === otp_mail) {
        // res.send('Your OTP is successfully verified');
        res.render('home');
    } else {
        res.send("Your OTP is incorrect");
    }
});

// Route to regenerate OTP and send email
app.get('/regenerate-otp', async (req, res) => {
    otp_mail = generateOtp(); // Regenerate OTP
    sendOtpEmail(otp_mail); // Send OTP via email
    res.send('OTP regenerated and sent to your email');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    otp_mail = generateOtp(); // Generate initial OTP
    sendOtpEmail(otp_mail); // Send initial OTP via email
});