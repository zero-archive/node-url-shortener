/**
 * Mongo model for node-url-shortener
 */
var mongo = require('mongodb'),
    base64 = require('./base64');

var MongoModel = module.exports = function(config){
    this.db = new mongo.Db('nus', new mongo.Server(config.host, config.port, {auto_reconnect: true}), {native_parser:true});
    this.config = config;
};

MongoModel._collection_ = 'nus';

MongoModel.prototype.b64encode = function(url){
    return base64.encode(url);
};

MongoModel.prototype.openDb = function(callback){
    var self = this;

    this.db.open(function(db){
        if(self.config.user && self.config.pass){
            self.db.admin().authenticate(self.config.user, self.config.pass, function(err, replies) {
                callback(err, replies);
            });
        }
    });
};

MongoModel.prototype.getCollection = function(callback){
    var self = this;

    this.openDb(function(err, replies){
        self.db.collection(MongoModel._collection_, function(err, collection){
            if(err){
                callback(err);
            }else{
                callback(null, collection);
            }
        });
    });
};

MongoModel.prototype.findOne = function(request, callback){
    this.getCollection(function(err, collection){
        if(err){
            callback(503);
        }else{
            collection.findOne(request, function(err, cursor){
                if(cursor){
                    callback(null, cursor);
                }else{
                    callback(err)
                }
            });
        }
    });
};

MongoModel.prototype.save = function(long_url, callback){
    var self = this;

    this.getCollection(function(err, collection){
        if(err){
            callback(503);
        }else{
            collection.count({}, function(err, cursor){
                if(err){
                    callback(503);
                }else{
                    var response = {
                        'hash'      : self.b64encode(cursor),
                        'long_url'  : long_url
                    }

                    collection.insert(response, function() {
                        callback(null, response);
                    });
                }
            });
        }
    });
};

MongoModel.prototype.set = function(long_url, callback){
    var self = this;

    var request = {
        'long_url' : long_url
    }

    self.findOne(request, function(err, reply){
        if(reply){
            callback(null, reply);
        }else{
            self.save(long_url, function (err, reply){
                if(err){
                    callback(503);
                }else{
                    callback(null, reply);
                }
            });
        }
    });
}

MongoModel.prototype.get = function(short_url, callback){
    var self = this;

    var request = {
        'hash' : short_url
    }

    self.findOne(request, function(err, reply){
        if(err){
            callback(500);
        }else if(reply.long_url){
            var response = {
                'hash'      : short_url,
                'long_url'  : reply.long_url
            }

            callback(null, response);
        }else{
            callback(503);
        }
    });
}
