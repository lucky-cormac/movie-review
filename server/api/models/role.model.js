const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ROLES } = require('../utils/constants');

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: Object.values(ROLES),
  },
  description: {
    type: String,
  },
});

const RoleModel = mongoose.model('role', RoleSchema);

module.exports = RoleModel;
