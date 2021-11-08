const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
  id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'product', key:'product_id'},
    model: 'product',
    key: 'id'
  },
  
  tag_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'tag', key:'tag_id'},
    model: 'product',
    key: 'id'
  },
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
