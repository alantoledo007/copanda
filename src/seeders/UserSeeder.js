const { User } = require('../db');
const password = '12345678';

const create = async (email, role) => {
    const user = new User();
    user.password  = await user.encryptPassword(password);
    user.email = email;
    user.role = role;
    await user.save();
}

module.exports = async () => {
    try{
        await create('admin@copanda.com.ar', 'admin');
        await create('user@copanda.com.ar', 'user');
    }
    catch (error) {
        console.log('Error at UserSeeder.js: ',error)
    }
}