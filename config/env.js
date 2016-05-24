var path = require('path')
  , cors = require('cors')
  , morgan  = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

module.exports = function (express, app) {
  __dirname = app.get('__dirname');

  // View engine setup
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  // Middleware
  app.use(cors());
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
};
