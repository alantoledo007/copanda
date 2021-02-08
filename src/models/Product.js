const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const Product = sequelize.define(
		"Product",
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
            category_id: {
				type: DataTypes.BIGINT,
				allowNull: false
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull:false
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull:false,
                defaultValue:0
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
		},
		{
			tableName: "products",
		}
	);

	sequelizePaginate.paginate(Product);
};