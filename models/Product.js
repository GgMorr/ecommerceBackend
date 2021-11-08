// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
  product_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  product_name: {
    // define columns
    type: DataTypes.STRING,
    allowNull: false,
  },

  price: {
    // define columns
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  stock: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  category_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category', 
      key: 'id'
    }
  },
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
