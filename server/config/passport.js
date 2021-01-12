const passport = require('passport');
const httpStatus = require('http-status');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../api/models/user.model');
const APIError = require('../api/helpers/APIError');
const { jwtSecret } = require('./vars');
const jwtOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      const { role } = req.body;

      UserModel.findOne({ email })
        .then((user) => {
          if (user) {
            return done(
              new APIError(
                'Email already exists.',
                httpStatus.BAD_REQUEST,
                true,
              ),
            );
          }

          return UserModel.create({ email, password, role })
            .then((user) => UserModel.populate(user, { path: 'role' }))
            .then((user) => done(null, user));
        })
        .catch((err) => done(err));
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      UserModel.findOne({ email })
        .populate('role')
        .then((user) => {
          if (!user) {
            return done(
              new APIError('User not found.', httpStatus.UNAUTHORIZED, true),
            );
          }

          if (!user.isValidPassword(password)) {
            return done(
              new APIError('Invalid password.', httpStatus.UNAUTHORIZED, true),
            );
          }

          return done(null, user);
        })
        .catch((err) => done(err));
    },
  ),
);

passport.use(
  'jwt',
  new JWTstrategy(jwtOpts, (jwtPayload, done) => {
    UserModel.findById(jwtPayload._id)
      .populate('role')
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => done(err));
  }),
);
