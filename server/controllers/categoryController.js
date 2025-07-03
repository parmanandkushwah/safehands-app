const { ServiceCategory } = require('../models');

exports.getAll = async (req, res) => {
  const categories = await ServiceCategory.findAll();
  res.json(categories);
};
