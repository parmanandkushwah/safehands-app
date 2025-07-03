
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Service;
