require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
	`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});
// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
    User,
    ProductCategory,
    Product,
    Order,
    Orderline,
    DocType,
    Company,
    AvailableCompanySettings,
    CompanySettings,
} = sequelize.models;

//Aca vendrian las relaciones
User.hasMany(Company, {foreignKey: 'company_id', as: 'companies'});
User.hasMany(Order, {foreignKey: 'buyer_id', as:'orders'});

ProductCategory.hasMany(Product, {foreignKey: 'category_id', as: 'products'});

Product.belongsTo(ProductCategory, {foreignKey: 'category_id', as: 'category'});
Product.belongsTo(Company, {foreignKey: 'company_id', as: 'company'});
Product.hasMany(Orderline, {foreignKey: 'product_id', as:'orderlines'});

Order.balongsTo(Company, {foreignKey: 'company_id', as: 'company'});
Order.hasMany(Orderline, {foreignKey:'order_id',as:'orderlines'});
Order.belongsTo(User, {foreignKey:'buyer_id',as:'buyer'});

Orderline.belongsTo(Order,{foreignKey:'order_id',as:'order'});
Orderline.belongsTo(Product,{foreignKey:'product_id',as:'product'});

DocType.hasMany(Company,{foreignKey:'doc_type_id',as:'companies'});

Company.hasMany(Product,{foreignKey:'company_id',as:'products'});
Company.hasMany(Order,{foreignKey:'company_id',as:'orders'});
Company.hasMany(CompanySettings,{foreignKey:'company_id',as:'settings'});
Company.belongsTo(User,{foreignKey:'user_id',as:'user'});
Company.belongsTo(DocType,{foreignKey:'doc_type_id', as:'doctype'});

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};