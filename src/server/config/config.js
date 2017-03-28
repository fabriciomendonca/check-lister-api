const env = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/check-list-app-test';
} else {
  process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/check-list-app';
}

process.env.PORT = process.env.PORT || 3000;

module.exports = { env };