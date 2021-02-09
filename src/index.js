require('dotenv').config();
const express = require('express');
const server = express();
const port = 3000;
const routes = require('./routes');
const { conn, User, Company, DocType, ProductCategory } = require('./db');
const bcrypt = require("bcrypt");

//adminBro
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');
const passwordFeature = require('@admin-bro/passwords')

const seeders = require('./seeders');
const CrudGenerator = require('./CurdGenerator');


//adminBro

const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin';

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
            resource: Company,
            options: {
                properties: {
                    id: {isId:true}
                }
            }
        },
        {
            resource: User,
            options: {
                properties: {
                    id:{
                        isId:true,
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
const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            if (await user.matchPassword(password)) {
            return user
            }
        }
        return false
    },
    cookiePassword: 'session Key',
})

const crudGenerator = new CrudGenerator(
    [
        User,
        Company,
        ProductCategory,
        {
            model:DocType,
            withPagination:false,
        }
    ],
    {
        basePath: '/api'
    }
);

const startServer = () => {
    server.listen(port, () => {
        server.use(adminBro.options.rootPath, adminBroRouter);
        server.use(crudGenerator.config.basePath, crudGenerator.router())
        server.get("*", (_, res) => {
            return res.send({
                message: "Not found"
            }).status(404);
        });
        console.log(`Server is running at http://localhost:${port}`);
    })
}
const { DB_FORCE } = process.env;

if(DB_FORCE !== 'true' && DB_FORCE !== 'false') throw TypeError('The env variable "DB_FORCE" should be exactly "true" or "false"');

const force = DB_FORCE === 'true' ? true : false;
conn.sync({force})
    .then(async () => {
        if(force) await seeders();
        startServer();
    })
    .catch((err) => {
        console.log('Error has occurred ', err)
    })

