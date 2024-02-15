const express = require('express');
//express is a serverside webapp framework of node.js

const mongoose = require('mongoose');
// an object data modelling (ODM) library for mongodb and node.js

const bodyParser = require('body-parser');
//it is middleware to parse incoming request  bodies

const cors = require('cors');
//it is middleware to enable cross origin resource sharing (cors)

//server setup
const app = express();
const PORT = 3000;

//connection to mongodb database
mongoose.connect('mongodb://localhost:27017/angularcrud');

app.use(bodyParser.json()); //use body-parser to parse JSON data from incoming request

app.use(cors());

//defing the schema and model

const taskSchema = new mongoose.Schema({
    title:String,
    description:String
})

const Task = mongoose.model('Task', taskSchema);
//creating a mongoose model called Task based on the above schema.

//CRUD
//read all tasks from the database (R)

app.get('/api/tasks',async(req,res)=>{

    const tasks = await Task.find();
    res.json(tasks);
});

//creating tasks in the database (C)

app.post('/api/tasks' ,async(req,res)=>{
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
})

//update the tasks in the database by id (U)

app.put('/api/tasks/:id', async(req,res)=>{
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(updateTask);

});

//delete (D)

app.delete('/api/tasks/:id', async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
});

//starting the server

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})


