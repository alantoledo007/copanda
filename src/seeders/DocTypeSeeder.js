const { DocType } = require('../db');

const create = async (name) => {
    await DocType.create({name})
}

module.exports = async () => {
    try{
        await create('DNI');
        await create('CUIT');
        await create('CUIL');
        await create('RUT');
    }
    catch (error) {
        console.log('Error at DocTypeSeeder.js: ', error);
    }
}