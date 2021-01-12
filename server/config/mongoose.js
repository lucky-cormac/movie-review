const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

mongoose.Promise = require('bluebird');

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () =>
  mongoose.connect(mongo.uri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
exports.disconnect = () => mongoose.disconnect();
