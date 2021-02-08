const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const Order = sequelize.define(
		"Order",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			company_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            buyer_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
		},
		{
			tableName: "orders",
		}
	);

	sequelizePaginate.paginate(Order);
};