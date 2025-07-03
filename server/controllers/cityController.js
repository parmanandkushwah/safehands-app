const { City } = require('../models');

exports.getAll = async (req, res) => {
  const cities = await City.findAll();
  res.json(cities);
};

exports.getById = async (req, res) => {
  const city = await City.findByPk(req.params.id);
  if (!city) return res.status(404).json({ message: 'City not found' });
  res.json(city);
};
