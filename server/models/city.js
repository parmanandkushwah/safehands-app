
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = City;
