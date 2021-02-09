const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"DocType",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique:true
            }
		},
		{
			tableName: "doctypes",
		}
	);
};