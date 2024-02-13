var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer();
const path = require('path');

var app = express();

let portnumber = process.env.port || 3000;

//setup view engine
app.set("views/register", path.join(__dirname));
app.set("view engine", "ejs");

app.set('view engine','pug');
app.set('views','./views');

//body-parser middleware
//to parse URL encoded data
/*app.use(bodyparser.urlencoded({extended:false}));*/

app.use(express.static('public')); // serve the static files 

app.use(upload.array());

app.use(cookieparser());

app.use(session({secret:"It's a secret message."}));

var users = [];

//to parse json data
/*app.use(bodyparser.json());

app.get('/', function(req,res){
    res.render("form");
});

app.post('/savedetails',(req,res)=>{
    console.log("body-parser called: ",req.body.uname);
});*/

app.get('/test',function(req,res){
    res.render('test');
});

app.get('/register', function(req,res){
    res.render('register');
});

app.post('/register',function(req,res){
    if(!req.body.uname || !req.body.pwdname){
        res.status("400");
        res.send("Invalid data");
    }
    else{
        users.filter(function(user){
            if(user.uname===req.body.uname){
                res.render("register",{message:"User already exists. Please login."});
            }
        });
    var newUser = {username:req.body.uname,password:req.body.pwdname};
    users.push(newUser);
    req.session.user = newUser;
    res.redirect('/test');    
    }
});

function loginCheck(req,res){
    if(req.session.user){
        next(); // If the user is already logged in, proceed to the webpage
    }
    else{
        var err = new Error("Not logged in");
        console.log(req.session.user);
        next(err); // Unauthorized access to the page
    }
}


app.get('/test', loginCheck, function(req,res){
    res.render('test', {uname:req.session.user.uname});
});

app.get('/Signin',function(req,res){
    res.render('loginpage');
});

app.post('/Signin', function(req,res){
    console.log(users);
    if(!req.body.uname || !req.body.pwdname)
    {
        res.render('loginpage',{message:"Enter both the details username and password"});
    }
    else{
        users.filter(function(user){
            if(user.uname===req.body.uname && user.pwdname===req.body.pwdname){
                req.session.user = user;
                res.redirect('test');
            }
        });
        res.render('loginpage',{message:"Invalid details"});
    }
});

app.get('/logout',function(req,res){
    req.session.destroy(function(){
        console.log("user has been logged out.");
    });
    res.redirect('/loginpage');
});



/*app.get('/', function(req,res){
    //res.cookie('testkey','test-cookie',{expire:3600 + Date.now()}).send('cookie set');
    if(req.session.pagecount){
        req.session.pagecount++;
        res.send("Page view count: "+req.session.pagecount);
    }
    else{
        req.session.pagecount = 1;
        res.send("Visiting for the first time.");
    }
});

app.get('/clearcookie', function(req,res){
    res.clearCookie('testkey');
    res.send('cookie name deleted successfully');
});*/

app.listen(portnumber, function(error){
    if(error) throw error;
    console.log("server created on the port 3000 successfully");
});




/*var routing_page = require('./routingpage.js');

var jsonParser = bodyparser.json();

var urlencodedparser = bodyparser.urlencoded({extended:false});

app.post('/login/:username',urlencodedparser, function(req,res){
    res.send('welcome to'+ req.body.username);
});

app.get('/users', jsonParser, function(req,res){

});

app.use('/routingpage', routing_page);

//url building or dynamic routes
/*app.get('/routingpage/:value', function(req,res){
    res.send('value is: '+ req.params.value);
});

//first middleware before the response is sent/generated
app.use(function(req,res,next){
    console.log("Start logged in at: "+ Date.now());
    next(); // next middleware which tells us that move on to the next request
});

//route handler
app.get('/',function(req,res){
    res.send('Middle page');
});

app.use('/',function(req,res){
    console.log('End process ');
});



app.listen(3000);*/