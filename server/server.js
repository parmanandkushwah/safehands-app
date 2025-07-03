const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/service-categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;


sequelize.sync().then(() => {
  // Listen on all network interfaces for LAN access
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (0.0.0.0)`);
    console.log('If you want to access this server from another device, use your local IP address.');
  });
});

// Run the demo seeder
require('child_process').exec('node seeders/demoSeeder.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing demo seeder: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`Seeder stderr: ${stderr}`);
    return;
  }
  console.log(`Seeder output: ${stdout}`);
});
