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
                if(err) {
                    if (typeof callback === 'function') {
                        callback(false);
                    }
                } else {
                    var sort_url = baseEncode(reply);

                    client.mset([long_url, sort_url, sort_url, long_url], function (err, reply) {
                        if (typeof callback === 'function') {
                            callback(sort_url);
                        }
                    });
                }
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

/**
 *  Base64 encode
 *  http://www.webtoolkit.info/
 **/
var baseEncode = function (input) {
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