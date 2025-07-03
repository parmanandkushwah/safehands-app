const { Review, ProviderProfile, User } = require('../models');

exports.getByProvider = async (req, res) => {
  const reviews = await Review.findAll({
    where: { providerProfileId: req.params.providerId },
    include: [User]
  });
  res.json(reviews);
};

exports.create = async (req, res) => {
  const { providerProfileId, rating, comment } = req.body;
  const review = await Review.create({
    userId: req.user.id,
    providerProfileId,
    rating,
    comment
  });
  res.status(201).json(review);
};

exports.featured = async (req, res) => {
  const reviews = await Review.findAll({ where: { featured: true }, include: [ProviderProfile, User] });
  res.json(reviews);
};
