const readline = require('readline');

const connection = require('./lib/connectMongoose');
const Advertisements = require('./models/Advertisements');
const initData = require('./init-db-data.json');


main().catch(err => console.log('Error', err));

async function main() {
    const borrar = await question(
        '¿Seguro de borrar base de datos?'
    )
    if (!borrar) {
        process.exit();
    }

    await initAdvertisements();

    connection.close();
}

async function initAdvertisements() {
    //borrar documentos coleccion Avertisements
    const deleted = await Advertisements.deleteMany();
   
    console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

    //crear documentos iniciales
    const inserted = await Advertisements.insertMany(initData.advertisements);
    console.log(`Creados ${inserted.length} anuncios.`);
}

function question(text) {
    return new Promise((resolve, reject) => {
        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        ifc.question(text, respuesta => {
            ifc.close();
            if (respuesta.toLowerCase()=== 'si') {
                resolve(true);
            }else{
                resolve(false);
            }
        })
    });
}