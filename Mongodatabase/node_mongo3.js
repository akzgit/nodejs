var MongoClient= require('mongodb').MongoClient;
var url ="mongodb://127.0.0.1:27017/InventoryManagement"

async function mconnect() {
    try {
    const client = await MongoClient.connect(url);
    const db = client.db('InventoryManagement');
    console.log("Connection secured");

    // creating collection

    // db.createCollection("items", function(err, res) {
    // if (err) throw err;
    // console.log("Database and collection created successfully");

    // inserting single data

//     var products = {"pname": "Laptop", "pcategory": "Electronics", "pquantity":
//                    "150", "pprice": "35000"};
//     db.collection("items").insertOne (products, function(err, res) {
//     if (err) {
//     console.error('Failed to insert document:', err); 
//     return;
//    }
//     console.log("Document inserted successfully");
    

   const itemsCollection = db.collection("items");
   const output = await itemsCollection.find({}).toArray();
   console.log("All records:",output);
    

    client.close();
}
} catch(err) {
   console.error('Failed to connect to MongoDB:', err);
}

mconnect();