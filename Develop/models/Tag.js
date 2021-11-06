const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  
  tag_id: {
    // define columns
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },

  tag_name: {
    // define columns
    type: DataTypes.STRING,
    allowNull: false
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
