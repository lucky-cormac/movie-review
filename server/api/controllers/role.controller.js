const httpStatus = require('http-status');
const RoleModel = require('../models/role.model');

exports.getRoles = (req, res, next) => {
  RoleModel.find({})
    .then((roles) => res.status(httpStatus.OK).json({ roles }))
    .catch((err) => next(err));
};
