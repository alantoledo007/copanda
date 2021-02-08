const users = require('./UserSeeder');
const doctypes = require('./DocTypeSeeder');

module.exports = async () => {
    await users();
    await doctypes();
}