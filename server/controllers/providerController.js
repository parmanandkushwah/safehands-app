const { ProviderProfile, User, City, Service, ProviderService } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  const { serviceId, cityId } = req.query;
  const where = {};
  if (cityId) where.cityId = cityId;
  let include = [User, City, { model: Service, through: { attributes: [] } }];
  let providers = await ProviderProfile.findAll({ where, include });
  if (serviceId) {
    providers = providers.filter(p => p.Services.some(s => s.id == serviceId));
  }
  res.json(providers);
};

exports.getById = async (req, res) => {
  const provider = await ProviderProfile.findByPk(req.params.id, { include: [User, City, { model: Service, through: { attributes: [] } }] });
  if (!provider) return res.status(404).json({ message: 'Provider not found' });
  res.json(provider);
};

exports.create = async (req, res) => {
  const { userId, bio, yearsOfExperience, qualifications, cityId, verified, serviceIds } = req.body;
  const profile = await ProviderProfile.create({ userId, bio, yearsOfExperience, qualifications, cityId, verified });
  if (serviceIds && serviceIds.length) {
    await profile.setServices(serviceIds);
  }
  res.status(201).json(profile);
};

exports.update = async (req, res) => {
  const profile = await ProviderProfile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ message: 'Provider not found' });
  await profile.update(req.body);
  if (req.body.serviceIds) {
    await profile.setServices(req.body.serviceIds);
  }
  res.json(profile);
};

exports.featured = async (req, res) => {
  // For demo, return all verified providers
  const providers = await ProviderProfile.findAll({ where: { verified: true }, include: [User, City, { model: Service, through: { attributes: [] } }] });
  res.json(providers);
};
