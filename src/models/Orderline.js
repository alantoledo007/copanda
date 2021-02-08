const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const Orderline = sequelize.define(
		"Orderline",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true
			},
			order_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            product_id: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull:false
            }
		},
		{
			tableName: "orderlines",
		}
	);

	sequelizePaginate.paginate(Orderline);
};