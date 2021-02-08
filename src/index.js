require('dotenv').config();
const express = require('express');
const server = express();
const port = 3000;
const routes = require('./routes');
const { conn, User } = require('./db');
const bcrypt = require("bcrypt");

//adminBro
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const passwordFeature = require('@admin-bro/passwords')


//adminBro

const managerParent = {
    name:'Manage',
    icon: 'Settings'
}

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
    rootPath: '/admin',
    databases:[conn],
    branding: {
        companyName: 'Copanda',
    },
    resources: [
        {
            resource: User,
            options: {
                properties: {
                    id:{
                        idId:true,
                    },
                    password: {
                        type:'password'
                    },
                },
                //parent: managerParent
            },
            features: [passwordFeature({
                // PasswordsOptions
                properties: {
                // to this field will save the hashed password
                encryptedPassword: 'password'
                },
                hash: async (password) => {
                    if(password.length >= 30) return password;
                    const salt = await bcrypt.genSalt(10);
                    const hash = bcrypt.hash(password, salt);
                    console.log(hash)
                    return hash;
                },
            })]
        }
    ],
});
const adminBroRouter = AdminBroExpress.buildRouter(adminBro);

const startServer = () => {
    server.listen(port, () => {
        server.use(adminBro.options.rootPath, adminBroRouter);
        server.use(routes);
        console.log(`Server is running at http://localhost:${port}`);
    })
}
const { DB_FORCE } = process.env;

if(DB_FORCE !== 'true' && DB_FORCE !== 'false') throw TypeError('The env variable "DB_FORCE" should be exactly "true" or "false"');

const force = DB_FORCE === 'true' ? true : false;
conn.sync({force})
    .then(() => {
        startServer();
    })
    .catch((err) => {
        console.log('Error has occurred ', err)
    })

