const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const DocType = sequelize.define(
		"DocType",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
                type: DataTypes.STRING(5),
                allowNull: false,
                unique:true
            }
		},
		{
			tableName: "doctypes",
		}
	);

	sequelizePaginate.paginate(DocType);
};