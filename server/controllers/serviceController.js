const { Service, ServiceCategory } = require('../models');

exports.getAll = async (req, res) => {
  const { cityId, categoryId } = req.query;
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  // cityId filtering can be added if services are city-specific
  const services = await Service.findAll({ where, include: [ServiceCategory] });
  res.json(services);
};

exports.getById = async (req, res) => {
  const service = await Service.findByPk(req.params.id, { include: [ServiceCategory] });
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};
