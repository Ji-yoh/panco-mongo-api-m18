const { connect, connection } = require('mongoose');

const connectDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api';

connect(connectDB);

module.exports = connection;