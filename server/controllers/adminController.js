const { User, ProviderProfile, Booking, Review, ServiceCategory, Service } = require('../models');

exports.getDashboard = async (req, res) => {
  const users = await User.count();
  const providers = await ProviderProfile.count();
  const bookings = await Booking.count();
  const reviews = await Review.count();
  res.json({ users, providers, bookings, reviews });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getProviders = async (req, res) => {
  const providers = await ProviderProfile.findAll({ include: [User] });
  res.json(providers);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.findAll();
  res.json(reviews);
};

exports.getCategories = async (req, res) => {
  const categories = await ServiceCategory.findAll();
  res.json(categories);
};

exports.getServices = async (req, res) => {
  const services = await Service.findAll();
  res.json(services);
};
