const mongoose = require('mongoose');
const { adminEmail } = require('../../config/vars');

module.exports = [
  {
    email: adminEmail,
    password: 'test',
    firstName: 'Loelle',
    lastName: 'Page',
    role: mongoose.Types.ObjectId('5eb208ed3e09c3ad3ee26184'),
  },
  {
    email: 'user@user.com',
    password: 'test',
    firstName: 'Larry',
    lastName: 'Douglas',
    role: mongoose.Types.ObjectId('5eb208ed3e09c3ad3ee26185'),
  },
];
