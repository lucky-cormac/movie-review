const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { BCRYPT_SALT_ROUNDS } = require('../utils/constants');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'role',
  },
});

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, BCRYPT_SALT_ROUNDS);
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  const { password } = this.getUpdate();
  if (password) {
    const encryptedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    this.setUpdate({ ...this.getUpdate(), password: encryptedPassword });
  }
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
