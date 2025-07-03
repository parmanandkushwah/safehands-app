require('dotenv').config();

const sequelize = require('./sequelize');
const { Sequelize } = require('sequelize');

// Import all models
const User = require('./user');
const City = require('./city');
const ServiceCategory = require('./serviceCategory');
const Service = require('./service');
const ProviderProfile = require('./providerProfile');
const ProviderService = require('./providerService');
const Booking = require('./booking');
const Review = require('./review');
const Admin = require('./admin');

// Associations
City.hasMany(ProviderProfile, { foreignKey: 'cityId' });
ProviderProfile.belongsTo(City, { foreignKey: 'cityId' });

ServiceCategory.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(ServiceCategory, { foreignKey: 'categoryId' });

User.hasOne(ProviderProfile, { foreignKey: 'userId' });
ProviderProfile.belongsTo(User, { foreignKey: 'userId' });

ProviderProfile.belongsToMany(Service, { through: ProviderService, foreignKey: 'providerProfileId' });
Service.belongsToMany(ProviderProfile, { through: ProviderService, foreignKey: 'serviceId' });

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

ProviderProfile.hasMany(Booking, { foreignKey: 'providerProfileId' });
Booking.belongsTo(ProviderProfile, { foreignKey: 'providerProfileId' });

Service.hasMany(Booking, { foreignKey: 'serviceId' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

ProviderProfile.hasMany(Review, { foreignKey: 'providerProfileId' });
Review.belongsTo(ProviderProfile, { foreignKey: 'providerProfileId' });

User.hasOne(Admin, { foreignKey: 'userId' });
Admin.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  City,
  ServiceCategory,
  Service,
  ProviderProfile,
  ProviderService,
  Booking,
  Review,
  Admin
};
