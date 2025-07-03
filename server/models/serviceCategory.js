
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ServiceCategory = sequelize.define('ServiceCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = ServiceCategory;
