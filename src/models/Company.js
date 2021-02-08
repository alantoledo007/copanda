const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const Company = sequelize.define(
		"Company",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
            fantasy_name: {
                type: DataTypes.STRING(255),
                allowNull:false
            },
            legal_name: {
                type: DataTypes.STRING(255),
                allowNull:false,
            },
            doc_type_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            doc_number: {
                type: DataTypes.STRING(30),
                allowNull:false
            },
            username: {
                type: DataTypes.STRING(15),
                allowNull:true,
                unique:true
            },
            verified_at: {
              type: DataTypes.DATE,
              allowNull:true
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull:false
            },
            currency_code: {
                type: DataTypes.STRING(3),
                allowNull:false
            }
		},
		{
			tableName: "companies",
		}
	);

	sequelizePaginate.paginate(Company);
};