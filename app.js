// app.js

const mongoOperations = require('./mongodbOperations');

async function main() {
    try {
        await mongoOperations.connectToMongo();

        // Datos del perro
        const dogData = {
            nombre: "Fido",
            raza: "Labrador",
            edad: 5,
            vacunado: true
        };

        // Insertar perro
        const insertedId = await mongoOperations.insertDog(dogData);
        console.log(`Nuevo documento insertado con el _id: ${insertedId}`);

        // Buscar el perro insertado
        const foundDog = await mongoOperations.findDogById(insertedId);
        console.log(foundDog);

    } catch (e) {
        console.error(e);
    } finally {
        await mongoOperations.closeConnection();
    }
}

main();
