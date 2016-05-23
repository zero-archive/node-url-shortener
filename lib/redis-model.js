var redis = require('redis'),
    crypto = require('crypto');

var RedisModel = module.exports = function (config) {
      this.db = redis.createClient(config.port, config.host);
      if (config.pass) {
        this.db.auth(config.pass);
      }
    };

// General prefix
RedisModel._prefix_ = 'nus:';

// Keys

// nus:counter
RedisModel.prototype.kCounter = function () {
  return RedisModel._prefix_ + 'counter';
};

// nus:url:<long_url> <short_url>
RedisModel.prototype.kUrl = function (url) {
  return RedisModel._prefix_ + 'url:' + this.md5(url);
};

// nus:hash:<id> url <long_url>
// nus:hash:<id> hash <short_url>
// nus:hash:<id> clicks <clicks>
RedisModel.prototype.kHash = function (hash) {
  return RedisModel._prefix_ + 'hash:' + hash;
};

// Helpers
RedisModel.prototype.md5 = function (url) {
  return crypto.createHash('md5').update(url).digest('hex');
};

RedisModel.prototype.b64encode = function (cnt) {
  return new Buffer('' + cnt).toString('base64');
};

// Main methods
RedisModel.prototype.uniqId = function (callback) {
  this.db.incr(this.kCounter(), function (err, reply) {
    callback(err, reply);
  });
};

RedisModel.prototype.findUrl = function (long_url, callback) {
  this.db.get(this.kUrl(long_url), function (err, reply) {
    callback(err, reply);
  });
};

RedisModel.prototype.findHash = function (short_url, callback) {
  this.db.hgetall(this.kHash(short_url), function (err, reply) {
    callback(err, reply);
  });
};

RedisModel.prototype.clickLink = function (short_url) {
  this.db.hincrby(this.kHash(short_url), 'clicks', 1, function (err, reply) {
    return true;
  });
};

// Set record
RedisModel.prototype.set = function (long_url, callback) {
  var self = this;

  this.findUrl(long_url, function (err, reply) {
    if (err) {
      callback(500);
      self.db.quit();
    } else if (reply) {
      callback(null, {
        'hash' : reply,
        'long_url' : long_url
      });
      self.db.quit();
    } else {
      self.uniqId(function (err, reply) {
        if (err) {
          callback(500);
          self.db.quit();
        } else {
          var response = {
                'hash'     : self.b64encode(reply),
                'long_url' : long_url
              };

          self.db.multi([
            ['set', self.kUrl(long_url), response.hash],
            ['hmset', self.kHash(response.hash),
              'url', long_url,
              'hash', response.hash,
              'clicks', 0
            ]
          ]).exec(function (err, replies) {
            if (err) {
              callback(503);
            } else {
              callback(null, response);
            }
            self.db.quit();
          });
        }
      });
    }
  });
};

// Get record
RedisModel.prototype.get = function (short_url, callback, click) {
  var self = this;

  this.findHash(short_url, function (err, reply) {
    if (err) {
      callback(500);
    } else if (reply && 'url' in reply) {
      if (click) {
        self.clickLink(reply.hash);
      }

      callback(null, {
        'hash' : reply.hash,
        'long_url' : reply.url,
        'clicks' : reply.clicks || 0
      });
    } else {
      callback(503);
    }
    self.db.quit();
  });
};
