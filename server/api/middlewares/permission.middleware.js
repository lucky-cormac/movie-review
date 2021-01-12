const httpStatus = require('http-status');
const RoleModel = require('../models/role.model');
const APIError = require('../helpers/APIError');

/**
 * Check if current user has any of specified roles
 * @public
 */
exports.checkRole = (roles) => (req, res, next) => {
  const currentUser = req.user;

  RoleModel.findById(currentUser.role)
    .then((userRole) => {
      if (roles.includes(userRole.name)) {
        return next();
      }

      return next(
        new APIError(
          'Permission is not allowed to this user.',
          httpStatus.FORBIDDEN,
          true,
        ),
      );
    })
    .catch((err) => next(err));
};
