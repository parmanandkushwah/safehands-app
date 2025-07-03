const { sequelize, User, City, ServiceCategory, Service, ProviderProfile, ProviderService, Booking, Review } = require('../models');
const bcrypt = require('bcrypt');

async function seed() {
  await sequelize.sync({ force: true });

  // Cities
  const cities = await City.bulkCreate([
    { name: 'Mumbai' }, { name: 'Delhi' }, { name: 'Bangalore' }, { name: 'Hyderabad' },
    { name: 'Chennai' }, { name: 'Kolkata' }, { name: 'Pune' }, { name: 'Ahmedabad' }
  ]);

  // Service Categories
  const categories = await ServiceCategory.bulkCreate([
    { name: 'Home Care' },
    { name: 'Medical Services' },
    { name: 'Child Care' },
    { name: 'Elderly Care' },
    { name: 'Post-Surgery Care' }
  ]);

  // Services
  const services = await Service.bulkCreate([
    { name: 'Personal Care', categoryId: categories[0].id },
    { name: 'Nursing', categoryId: categories[0].id },
    { name: 'Companionship', categoryId: categories[0].id },
    { name: 'Doctor Visits', categoryId: categories[1].id },
    { name: 'Physiotherapy', categoryId: categories[1].id },
    { name: 'Health Monitoring', categoryId: categories[1].id },
    { name: 'Babysitting', categoryId: categories[2].id },
    { name: 'Child Development', categoryId: categories[2].id }
  ]);

  // Users
  const adminPassword = await bcrypt.hash('password123', 10);
  const userPassword = await bcrypt.hash('password123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@safehands.com', password: adminPassword, role: 'admin' });
  const user = await User.create({ name: 'Aryan Sakaria', email: 'aryansakaria01@gmail.com', password: userPassword, role: 'client' });
  const provider1 = await User.create({ name: 'Rajesh Patel', email: 'rajesh.patel@safehands.com', password: userPassword, role: 'provider' });
  const provider2 = await User.create({ name: 'Priya Sharma', email: 'priya.sharma@safehands.com', password: userPassword, role: 'provider' });
  const provider3 = await User.create({ name: 'Anita Reddy', email: 'anita.reddy@safehands.com', password: userPassword, role: 'provider' });

  // Provider Profiles
  const profile1 = await ProviderProfile.create({ userId: provider1.id, bio: 'Home Care Specialist', yearsOfExperience: 10, qualifications: 'BSc Nursing', cityId: cities[0].id, verified: true });
  const profile2 = await ProviderProfile.create({ userId: provider2.id, bio: 'Medical Services', yearsOfExperience: 8, qualifications: 'MBBS', cityId: cities[1].id, verified: true });
  const profile3 = await ProviderProfile.create({ userId: provider3.id, bio: 'Child Care Specialist', yearsOfExperience: 6, qualifications: 'Child Care Cert.', cityId: cities[2].id, verified: true });

  // Provider Services
  await profile1.setServices([services[0].id, services[1].id, services[2].id]);
  await profile2.setServices([services[3].id, services[4].id, services[5].id]);
  await profile3.setServices([services[6].id, services[7].id]);

  // Bookings
  await Booking.create({ userId: user.id, providerProfileId: profile1.id, serviceId: services[0].id, date: new Date(), status: 'confirmed' });
  await Booking.create({ userId: user.id, providerProfileId: profile3.id, serviceId: services[6].id, date: new Date(), status: 'pending' });

  // Reviews
  await Review.create({ userId: user.id, providerProfileId: profile1.id, rating: 5, comment: 'Excellent care!', featured: true });
  await Review.create({ userId: user.id, providerProfileId: profile2.id, rating: 4, comment: 'Very professional.', featured: true });
  await Review.create({ userId: user.id, providerProfileId: profile3.id, rating: 5, comment: 'Great with kids!', featured: true });

  console.log('Database seeded!');
  process.exit();
}

seed();
