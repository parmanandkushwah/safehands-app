
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  providerProfileId: { type: DataTypes.INTEGER, allowNull: false },
  serviceId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'), defaultValue: 'pending' }
});

module.exports = Booking;
