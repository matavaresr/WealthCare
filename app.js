// app.js

const mongoOperations = require('./mongodbOperations');

async function main() {
    try {
        await mongoOperations.connectToMongo();

        // Insertar usuario
        const insertedId = await mongoOperations.insertUser(userData);
        console.log(`Nuevo documento insertado con el _id: ${insertedId}`);

        // Buscar persona por ID
        const foundUser = await mongoOperations.findUserById(insertedId);
        console.log(foundUser);

    } catch (e) {
        console.error(e);
    } finally {
        await mongoOperations.closeConnection();
    }
}

main();
