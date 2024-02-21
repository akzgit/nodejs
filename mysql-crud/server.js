const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const bodyparser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.set("view engine", "ejs")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"nstikd",
});

connection.connect((error)=>{
    if(error) throw error;
    console.log("Connection successfully");
});
// const connection = require("./config/db.js");

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static(__dirname+"/views"));


app.get("/",(req,res)=>{
    res.redirect("/create.html");
    // res.redirect("/data");
});


app.get("/data",(req,res)=>{
    connection.query("SELECT * FROM student",(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            // res.send(rows);
            res.render("read.ejs",{rows});
        }
    });
});


app.post("/create",(req,res)=>{
        console.log("Create");
        console.log(req.body);
        const name = req.body.name;
        const email = req.body.email;
    try{
        connection.query(
            "INSERT INTO student(name,email) value (?,?)",
            [name,email],
            (err,rows)=>{
                if(err){
                    console.log(err);
                }else{
                    // res.send(rows);
                    res.redirect("/data");
                }
            }
        );
    }catch{
        console.log(err)
    }
});


app.get("/delete-data",(req,res)=>{
    connection.query("delete from student where id=?",[req.query.id],(err, rows)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/data");
        }
    });
});



// app.get("/delete", (req, res) => {
//     const id = req.query.id;
//     if (!id) {
//         return res.status(400).send("ID parameter is missing");
//     }

//     connection.query("DELETE FROM student WHERE id =?", [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting record:", err);
//             return res.status(500).send("Error deleting record");
//         }

//         console.log("Record deleted successfully");
//         res.redirect("/data");
//     });
// });


app.listen(process.env.PORT|| 3000,(error)=>{
    if(error) throw error;
    console.log(`server is runing  on port ${PORT}`);
});



