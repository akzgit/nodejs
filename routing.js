var express=require('express');
var app=express();

var router=express.Router();

router.get('/',function(req,res){
    res.send('We are on HOME page using get');
});


router.get('/routingval/:value', function(req,res){
    res.send('value is: '+ req.params.value);
})

router.post('/',function(req,res){
    res.send('We are on HOME page using post');
});

module.exports=router;