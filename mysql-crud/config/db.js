// const mysql = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config();

// const connection = mysql.createConnection({
//     host:process.env.HOST,
//     port:process.env.DB_PORT,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
// });


// connection.connect((error)=>{
//     if(error) throw error;
//     console.log("Connection successfully");
// });


// module.exports= connection;



const dotenv = require("dotenv"); 

const mysql = require("mysql"); 

dotenv.config(); 

const connection = mysql.createConnection({ 

host: process.env.HOST, 

user: process.env.USER, 

password: process.env.PASSWORD, 

database: process.env.DATABASE, 

}); 

connection.connect((error) => { 

if (error) return console.log(error); 

console.log("connection successfull"); 

}); 

module.exports = connection; 