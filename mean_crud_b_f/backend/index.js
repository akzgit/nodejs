const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const cors =require('cors');
var routers =require('./routes/routes')

const app = express();
const port =5000;

app.use(cors());
app.use(bodyParser.json());
app.use(routers);

//database connection
const dbURL="mongodb://localhost:27017/adit";
mongoose.connect(dbURL);
const connection =mongoose.connection;

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
})

connection.once("open",()=>{
    console.log("MongoDB connected successfully");
})