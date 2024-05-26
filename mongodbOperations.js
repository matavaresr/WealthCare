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

async function getDogtaChart(id) {
    const database = client.db("UserCore");
    const perros = database.collection("AccountTransactions");
    const result = await perros.find({ 'account.link': id }).toArray()
    return result;
}

async function insertUser(userData) {
    const database = client.db("AppCore");
    const usuarios = database.collection("Login");
    userData.createdAt = new Date();
    userData.updatedAt = new Date();
    const resultado = await usuarios.insertOne(userData);
    return resultado.insertedId;
}

async function findUserById(id) {
    const database = client.db("AppCore");
    const usuarios = database.collection("Login");
    return await usuarios.findOne({ _id: id });
}

async function loginUser(email, password) {
    const database = client.db("AppCore");
    const collection = database.collection("Login");
    const user = await collection.findOne({email: email});

    if (user && user.password === password) {
        return "inicio";
    } else {
        return "index";
    }
}

async function userExists(email) {
    const database = client.db("AppCore");
    const collection = database.collection("Login");
    const user = await collection.findOne({ email: email });
    return user !== null;
}
    
async function closeConnection() {
    await client.close();
}

module.exports = {
    connectToMongo,
    insertUser,
    findUserById,
    loginUser,
    closeConnection,
    userExists,
    getDogtaChart
};
