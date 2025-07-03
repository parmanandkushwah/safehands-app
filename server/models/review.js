
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  providerProfileId: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Review;
