
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ProviderService = sequelize.define('ProviderService', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  providerProfileId: { type: DataTypes.INTEGER, allowNull: false },
  serviceId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = ProviderService;
