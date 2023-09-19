const { connect, connection } = require('mongoose');

const connectDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api';

connect(connectDB);

module.exports = connection;