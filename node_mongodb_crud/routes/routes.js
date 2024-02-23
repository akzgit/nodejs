const express = require('express');
const router =express.Router();

// inserting data into database
const User=require('../models/users');

router.post("/add",(req,res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        age: req.body.age,
    });
    user.save()
    .then(response=>{
        req.session.message={
            type:'success',
            message:'user added successfully'
        },
        res.redirect('/');

    })
    .catch(error=>{
        res.json({
            type:'danger',
            message:error.message
        });
    })


});

//routes for home page
router.get("/",(req,res)=>{
    //reading data from database...
    User.find()
    .then(users=>{
        res.render('index',{
            title: 'Home page',
            users: users,
        });
    })
    .catch(error=>{
        res.json({
            message:error.message,
        });
    })
});


//routes for rendering add_user
router.get("/add",(req,res)=>{
    res.render('add_users',{
        title:"App users page"
    });

});

//deleteing data from database
router.get('/delete/:id',(req,res)=>{
    let id = req.params.id;
    User.findByIdAndDelete(id)
    .then(response=>{
        req.session.message ={
            type: 'info',
            message: ' User deleted successfully',
        };
        res.redirect('/');
    })
    .catch(error=>{
        res.json({
            type: 'danger',
            message:error.message,
        });
    })
});

// Route to render edit form
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then(user => {
        res.render('edit_user', { 
            title: 'Edit User',
            user: user
        });
    })
    .catch(error => {
        res.json({
            message: error.message
        });
    });
});
// Route to update user data
router.post('/update/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }, { new: true }) // {new: true} ensures the updated document is returned
    .then(response => {
        req.session.message = {
            type: 'success',
            message: 'User updated successfully!'
        };
        res.redirect('/');
    })
    .catch(error => {
        res.json({
            type: 'danger',
            message: error.message
        });
    });
});
module.exports= router;
