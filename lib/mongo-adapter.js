/**
 * Mongo adapter for node-url-shortener
 */

var config = require('./config'),
    mongo = require('mongodb');
 
var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : config.mongo.host;
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : config.mongo.port;

var MongoProvider = function(host, port) {
    this.db = new mongo.Db('nodedatabase', new mongo.Server(host, port, {auto_reconnect: true}), {native_parser:true});
    this.db.open(function(){});
};

MongoProvider.prototype.getCollection = function(callback) {
    this.db.collection('urls', function(err, collection) {
        if (err) {
            callback(err);
        } else {
            callback(null, collection);
        }
    });
};

MongoProvider.prototype.findOne = function(request, callback) {
    this.getCollection(function(err, collection) {
        if (err) {
            callback(err);
        } else {
            collection.findOne(request, function(err, cursor) {
                if(cursor) {
                    callback(null, cursor);
                } else {
                    callback(err)
                }
            });
        }
    });
};

MongoProvider.prototype.save = function(long_url, callback) {
    this.getCollection(function(err, collection) {
        if (err) {
            callback(err);
        } else {
            collection.count({}, function(err, cursor) {
                var short_url = baseEncode(cursor),
                    request = { 
                        'long_url'  : long_url,
                        'short_url' : short_url 
                    }

                collection.insert(request, function() {
                    callback(null, short_url);
                });
            });
        }
    });
};

client = new MongoProvider(host, port);

// Shorten function
function shorten(long_url, callback) {
    var request = { 'long_url' : long_url }

    client.findOne(request, function (err, reply) {
        if(reply) {
            if (typeof callback === 'function') {
                callback(reply.short_url);
            }
        } else {
            client.save(long_url, function (err, reply) {
                if(reply) {
                    if (typeof callback === 'function') {
                        callback(reply);
                    }
                }
            });
        }
    });
}

// Expand function 
function expand(short_url, callback) {
    var request = { 'short_url' : short_url }

    client.findOne(request, function (err, reply) {
        console.log(err);
        console.log(reply);
        if(reply) {
            if (typeof callback === 'function') {
                callback(reply.long_url);
            }
        } else {
            if (typeof callback === 'function') {
                callback(false);
            }            
        }
    });
}

/**
 *  Base64 encode
 *  http://www.webtoolkit.info/
 **/
var baseEncode = function (input) {

    if(typeof input !== 'string') {
        input = input.toString();
    }

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & (keyStr.length-1);

        if (isNaN(chr2)) {
            enc3 = enc4 = keyStr.length;
        } else if (isNaN(chr3)) {
            enc4 = keyStr.length;
        }

        output = output +
        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
        keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }

    return output;
}

exports.shorten = shorten;
exports.expand = expand;