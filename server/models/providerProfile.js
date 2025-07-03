
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const ProviderProfile = sequelize.define('ProviderProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  bio: { type: DataTypes.TEXT },
  yearsOfExperience: { type: DataTypes.INTEGER },
  qualifications: { type: DataTypes.STRING },
  cityId: { type: DataTypes.INTEGER, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = ProviderProfile;
