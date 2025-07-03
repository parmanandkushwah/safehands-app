const { Booking, User, ProviderProfile, Service } = require('../models');

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [ProviderProfile, Service]
  });
  res.json(bookings);
};

exports.create = async (req, res) => {
  const { providerProfileId, serviceId, date } = req.body;
  const booking = await Booking.create({
    userId: req.user.id,
    providerProfileId,
    serviceId,
    date
  });
  res.status(201).json(booking);
};

exports.getById = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id, { include: [ProviderProfile, Service] });
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};

exports.cancel = async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = 'cancelled';
  await booking.save();
  res.json(booking);
};
