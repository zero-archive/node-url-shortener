var url = require('url');

module.exports = function (opts) {
  var self = {};
  self.opts = opts || {};

  self.checkUrl = function (s, domain) {
    var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
        valid = true;

    // Url correct
    if (regexp.test(s) !== true) {
      valid = false;
    }

    // Url equal application url
    if (valid === true && domain === true) {
      if (url.parse(self.opts.url).hostname === url.parse(s).hostname) {
        valid = false
      }
    }

    return valid;
  };

  self.getModel = function (callback) {
    var RedisModel = require('./redis-model'),
        config = {
          host: self.opts['redis-host'],
          port: self.opts['redis-port'],
          pass: self.opts['redis-pass']
        };

    callback(null, new RedisModel(config));
  };

  self.shorten = function (long_url, callback) {
    if (this.checkUrl(long_url, true)) {
      this.getModel(function (err, model) {
        if (err) {
          callback(500);
        } else {
          model.set(long_url, callback);
        }
      });
    } else {
      callback(300);
    }
  };

  self.expand = function (short_url, callback, click) {
    if (this.checkUrl(short_url)) {
      short_url = short_url.split('/').pop();
    }

    if (short_url) {
      this.getModel(function (err, model) {
        if (err) {
          callback(500);
        } else {
          model.get(short_url, callback, click);
        }
      });
    } else {
      callback(300);
    }
  };

  self.statistic = function (hash, callback) {
    this.getModel(function (err, model) {
      if (err) {
        callback(500);
      } else {
        model.get(hash, callback);
      }
    });
  };

  return self;
};
