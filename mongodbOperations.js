// mongodbOperations.js

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://DataOwnerApi:4lQ14FEiUOgYc95d@repositorio-financiamen.es7d9dp.mongodb.net/?retryWrites=true&w=majority&appName=Repositorio-FinanciaMente"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB Atlas");
        return client;
    } catch (e) {
        console.error(e);
    }
}

async function insertDog(dogData) {
    const database = client.db("AppCore");
    const perros = database.collection("Login");
    const resultado = await perros.insertOne(dogData);
    return resultado.insertedId;
}

async function findDogById(id) {
    const database = client.db("AppCore");
    const perros = database.collection("Login");
    return await perros.findOne({ _id: id });
}

async function closeConnection() {
    await client.close();
}

module.exports = {
    connectToMongo,
    insertDog,
    findDogById,
    closeConnection
};
