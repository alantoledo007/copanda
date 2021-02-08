const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const CompanySettings = sequelize.define(
		"CompanySettings",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
            company_id: {
                type: DataTypes.BIGINT,
                allowNull:false
            },
            setting_id: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
			value: {
                type: DataTypes.TEXT,
                allowNull: true
            }
		},
		{
			tableName: "companies_settings",
		}
	);

	sequelizePaginate.paginate(CompanySettings);
};