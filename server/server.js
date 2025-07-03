const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// ✅ CORS setup for Vercel frontend + localhost (for local dev)
const allowedOrigins = [
  'safehands-hd7qubm3u-stranger004s-projects.vercel.app', // ← your Vercel frontend
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ Security and logging middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Public route for health check / test
app.get('/', (req, res) => {
  res.send('SafeHands backend is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/service-categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', require('./routes/admin'));

// ✅ Port config
const PORT = process.env.PORT || 5000;

// ✅ Start server after DB sync
sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} (0.0.0.0)`);
    console.log('If you want to access this server from another device, use your local IP address.');
  });
});

// ✅ Optional: Run demoSeeder.js in development only
if (process.env.NODE_ENV !== 'production') {
  const { exec } = require('child_process');
  exec('node seeders/demoSeeder.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Seeder error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Seeder stderr: ${stderr}`);
      return;
    }
    console.log(`Seeder output: ${stdout}`);
  });
}
