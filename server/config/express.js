const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const compress = require('compression');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const errorHandler = require('../api/middlewares/error.middleware');

require('./passport');

const app = express();

app.use(morgan(logs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(methodOverride());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

app.use('/v1', routes);
app.use(errorHandler.converter);
app.use(errorHandler.notFound);
app.use(errorHandler.handler);

module.exports = app;
