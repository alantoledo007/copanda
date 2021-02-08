const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const AvailableCompanySettings = sequelize.define(
		"AvailableCompanySettings",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
            name: {
                type: DataTypes.STRING(255),
                allowNull:false,
                unique:true
            },
            value: {
                type: DataTypes.TEXT,
                allowNull:true,
            }
		},
		{
			tableName: "availables_company_settings",
		}
	);

	sequelizePaginate.paginate(AvailableCompanySettings);
};