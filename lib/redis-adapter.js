/**
 * Redis adapter for node-url-shortener
 */

var config = require('./config'),
    redis = require("redis"),
    client = redis.createClient(config.redis.port, config.redis.host);

if(config.redis.auth) {
    client.auth(config.redis.auth);
}

// Redis debug mode
/*
redis.debug_mode = true;
client.on("error", function (err) {
    console.log("Error " + err);
});
*/

// Shorten function
function shorten(long_url, callback) {
    client.get(long_url, function (err, reply) {
        if(reply) {
            if (typeof callback === 'function') {
                callback(reply);
            }
        } else {
            client.incr('ids', function (err, reply) {
                var sort_url = toHex(reply);

                client.mset([long_url, sort_url, sort_url, long_url], function (err, reply) {
                    if (typeof callback === 'function') {
                        callback(sort_url);
                    }
                });
            });
        }
    });
}

// Expand function 
function expand(sort_url, callback) {
    client.get(sort_url, function (err, reply) {
        if (typeof callback === 'function') {
            callback(reply);
        }
    });
}

// Convert id to hex
function toHex(id) {
    id = parseInt(id);
    return id.toString(16);
}

exports.shorten = shorten;
exports.expand = expand;