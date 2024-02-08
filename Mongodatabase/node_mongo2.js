const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = "mydb";
const client = new MongoClient(url);

async function createCollection() {
  try {
    let result = await client.connect();
    let db = client.db(databaseName);
    // Specify the name of the collection you want to create
    let collectionName = 'newCollection';
    await db.createCollection(collectionName);
    console.log(`Collection "${collectionName}" created successfully.`);
  } finally {
    // Close the connection after creating the collection
    await client.close();
  }
}

createCollection();
