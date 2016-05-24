module.exports = function (app, nus) {
  var opts = app.get('opts')
    , api = require('./api.js')(app, nus)

  // api routes
  app.use('/api/v1', api);

  // index route
  app.route('/').all(function (req, res) {
    res.render('index');
  });

  // shorten route
  app.get(/^\/([\w=]+)$/, function (req, res, next){
    nus.expand(req.params[0], function (err, reply) {
      if (err) {
        next();
      } else {
        res.redirect(301, reply.long_url);
      }
    }, true);
  });

  // catch 404 and forwarding to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log('Caught exception: ' + err + '\n' + err.stack);
      res.status(err.status || 500);
      res.render('errors/404', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('errors/404', {
      message: err.message,
      error: {}
    });
  });
};

function sendResponse (res, code, data) {
  var status_codes = {
        200 : 'OK',
        300 : 'Incorrect Link',
        400 : 'Bad Request',
        404 : 'Not Found',
        500 : 'Internal Server Error',
        503 : 'Unknown Server Error'
      };

  res.type('application/json');

  data = data || {};
  data.status_code = (status_codes[code]) ? code : 503,
  data.status_txt = status_codes[code] || status_codes[503]

  res.status(data.status_code).json(data)
}
