/**
 * Redis model for node-url-shortener
 */
var redis = require('redis'),
    crypto = require('crypto'),
    base64 = require('./base64');

var RedisModel = module.exports = function(config){
    this.db = redis.createClient(config.port, config.host);

    if(config.pass){
        this.db.auth(config.pass);
    }
};

RedisModel._prefix_ = 'nus:';

// Prefixes
RedisModel.prototype.kCounter = function(){
    return RedisModel._prefix_ + 'counter';
};

RedisModel.prototype.kUrl = function(url){
    return RedisModel._prefix_ + 'url:' + this.md5(url);
};

RedisModel.prototype.kHash = function(url){
    return RedisModel._prefix_ + 'hash:' + url;
};

RedisModel.prototype.kHashUrl = function(){
    return 'url:';
};

// Helpers
RedisModel.prototype.md5 = function(url){
    return crypto.createHash('md5').update(url).digest('hex');
};

RedisModel.prototype.b64encode = function(url){
    return base64.encode(url);
};

// Main methods
RedisModel.prototype.uniqId = function(callback){
    this.db.incr(this.kCounter(), function(err, reply){
        callback(err, reply);
    });
};

RedisModel.prototype.findUrl = function(long_url, callback){
    this.db.get(this.kUrl(long_url), function(err, reply){
        callback(err, reply);
    });
};

RedisModel.prototype.findHash = function(short_url, callback){
    this.db.hgetall(this.kHash(short_url), function(err, reply){
        callback(err, reply);
    });
};

// Set record
RedisModel.prototype.set = function(long_url, callback){
    var self = this;

    this.findUrl(long_url, function(err, reply){
        if(err){
            callback(503);
        }else if(reply){
            callback(null, {
                'hash'      : reply,
                'long_url'  : long_url
            });
        }else{
            self.uniqId(function(err, reply){
                if(err){
                    callback(503);
                }else{
                    var response = {
                        'hash'      : self.b64encode(reply),
                        'long_url'  : long_url
                    }

                    self.db.multi([
                        ['set', self.kUrl(long_url), response.hash],
                        ['hmset', self.kHash(response.hash), self.kHashUrl(), long_url]
                    ]).exec(function (err, replies) {
                        if(err){
                            callback(503);
                        }else{
                            callback(null, response);
                        }
                    });
                }
            });
        }
    });
};

// Get record
RedisModel.prototype.get = function(short_url, callback){
    var self = this;

    this.findHash(short_url, function(err, reply){
        if(err){
            callback(500);
        }else if(reply[self.kHashUrl()]){
            callback(null, {
                'hash'      : short_url,
                'long_url'  : reply[self.kHashUrl()]
            });
        }else{
            callback(503);
        }
    });
};
