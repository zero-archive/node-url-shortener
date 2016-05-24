module.exports = function (app, nus) {
  var opts = app.get('opts')
    , router = require('express').Router();

  router.route('/shorten')
    .post(function (req, res) {
      nus.shorten(req.body['long_url'], function (err, reply) {
        if (err) {
          jsonResponse(res, err);
        } else if (reply) {
          reply.short_url = opts.url.replace(/\/$/, '') + '/' + reply.hash;
          jsonResponse(res, 200, reply);
        } else {
          jsonResponse(res, 500);
        }
      });
    });

  router.route('/expand')
    .post(function (req, res) {
      nus.expand(req.body['short_url'], function (err, reply) {
        if (err) {
          jsonResponse(res, err);
        } else if (reply) {
          jsonResponse(res, 200, reply);
        } else {
          jsonResponse(res, 500);
        }
      });
    });

  function jsonResponse (res, code, data) {
    var status_codes = {
          200: 'OK',
          300: 'Incorrect Link',
          400: 'Bad Request',
          404: 'Not Found',
          500: 'Internal Server Error',
          503: 'Unknown Server Error'
        };

    res.type('application/json');

    data = data || {};
    data.status_code = (status_codes[code]) ? code : 503,
    data.status_txt = status_codes[code] || status_codes[503]

    res.status(data.status_code).json(data)
  }

  return router;
};
