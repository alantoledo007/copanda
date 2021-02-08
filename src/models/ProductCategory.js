const { DataTypes } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize) => {
	const ProductCategory = sequelize.define(
		"ProductCategory",
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
            name: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
		},
		{
			tableName: "product_categories",
		}
	);

	sequelizePaginate.paginate(ProductCategory);
};