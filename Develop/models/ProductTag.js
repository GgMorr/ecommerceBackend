const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  
  product_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  
  tag_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;