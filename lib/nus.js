/**
 * node-url-shortener controller
 */
var config = require('./get-config'),
    fs = require('fs');

module.exports = {
    getConfig: function () {
        return (config.dotcloud) ? this.dotcloud() : config.redis;
    },

    getModel: function (callback) {
        var RedisModel = require('./redis-model'),
            dbconfig = this.getConfig();

        callback(null, new RedisModel(dbconfig));
    },

    dotcloud: function (dbtype) {
        var envfilepath = '/home/dotcloud/environment.json',
            environment = JSON.parse(fs.readFileSync(envfilepath)),
            cfg = {
                'host' : environment.DOTCLOUD_REDIS_REDIS_HOST,
                'port' : environment.DOTCLOUD_REDIS_REDIS_PORT,
                'pass' : environment.DOTCLOUD_REDIS_REDIS_PASSWORD
            };

        return cfg;
    },

    checkUrl: function (s) {
        var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    },

    shorten: function (long_url, callback) {
        if (this.checkUrl(long_url)) {
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
    },

    expand: function (short_url, callback, click) {
        if (this.checkUrl(short_url)) {
            short_url = short_url.split('/').pop();
        }

        this.getModel(function (err, model) {
            if (err) {
                callback(500);
            } else {
                model.get(short_url, callback, click);
            }
        });
    },

    statics: function (hash, callback) {
        this.getModel(function (err, model) {
            if (err) {
                callback(500);
            } else {
                model.get(hash, callback);
            }
        });
    }
};
