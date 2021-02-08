const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const User = sequelize.define(
		"User",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
            },
            email_verified_at: {
                type: DataTypes.DATE,
                allowNull:true
            },
            country_alpha2code: {
                type: DataTypes.STRING,
                allowNull:false
            },
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
		},
		{
			tableName: "users",
		}
	);

	User.prototype.encryptPassword = async (password) => {
		const salt = await bcrypt.genSalt(10);
		const hash = bcrypt.hash(password, salt);
		return hash;
	};

	User.prototype.matchPassword = async function (password) {
		return await bcrypt.compare(password, this.password);
	};

	// User.beforeCreate(async (user, options) => {
	// 	const hashedPassword = await user.encryptPassword(user.password)
	// 	user.password = hashedPassword;
	// });

	sequelizePaginate.paginate(User);
};