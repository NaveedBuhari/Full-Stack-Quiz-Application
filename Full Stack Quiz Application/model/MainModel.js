const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const dbName = "ipLab";

async function connect(){
    try{
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        console.log("Mongo connect!");
        return db;
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        console.log('out with error');
        throw error;
    }
}

module.exports = {connect};

