var path = require('path')
  , morgan  = require('morgan')
  , favicon = require('serve-favicon')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

module.exports = function (express, app) {
  __dirname = app.get('__dirname');

  // View engine setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // Middleware
  app.use(morgan('dev'))
  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use('/static', express.static(path.join(__dirname, 'public')));
};
