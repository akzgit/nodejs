var MongoClient= require('mongodb').MongoClient;
var url ="mongodb://127.0.0.1:27017/Mongodatabase/"
// var dbname="Mongodatabase";

MongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbname=db.db("Mongodatabase")
    // dbname.createCollection("items",function(err,res){
    //     if(err) throw err;
    //     console.log('Collection created successfully')
    //     db.close();
    // })
    // console.log('Database created successfully');
    // db.close();

    //insert data into the collection
    var products={"pname":"Laptop","pcategory":"Electronics","pquantity":"150","pprice":"35000"};
    db.collection("items").insertOne(products,function(err,res){
        if(err) throw err;
        console.log("One data inserted");
        db.close();
    })


    //sorting the data
    var sortdata={pname:1};// 1 is for ascending and -1 is for descending order
    db.collection("items").find().sort(sortdata).toArray(function(err,output){
           if(err) throw err;
           console.log(output)
           db.close();
    })

    //remove a specific data
    var removedata={pquantity:"150"}
    db.collection("items").remove(removedata,function(err,obj){
        if(err) throw err;
        console.log(obj.output.n+"record has been deleted");
        db.close

    });

});
console.log("connection started");