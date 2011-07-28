/**
 * node-url-shortener controller
 */
var config = require('./config'),
    fs = require('fs');

module.exports = { 
    getConfig: function(dbtype){
        return (config.dotcloud) ? this.dotcloud(dbtype) : config[dbtype];
    },

    getModel: function(callback){
        switch(config.dbtype){
            case 'redis': 
                var RedisModel = require('./redis-model'),
                    dbconfig = this.getConfig('redis');

                callback(null, new RedisModel(dbconfig));
            break;
            case 'mongo': 
                var MongoModel = require('./mongo-model'),
                    dbconfig = this.getConfig('mongo');
                
                callback(null, new MongoModel(dbconfig));
            break;
            default: 
                callback(503);
        }
    },

    dotcloud: function(dbtype){
        var envfilepath = '/home/dotcloud/environment.json',
            environment = JSON.parse(fs.readFileSync(envfilepath)),
            cfg = {};

        switch(dbtype){
            case 'redis': 
                cfg = {
                    'host' : environment['DOTCLOUD_REDIS_REDIS_HOST'],
                    'port' : environment['DOTCLOUD_REDIS_REDIS_PORT'],
                    'pass' : environment['DOTCLOUD_REDIS_REDIS_PASSWORD']
                }
            break;
            case 'mongo': 
                cfg = {
                    'host' : environment['DOTCLOUD_MONGO_MONGODB_HOST'],
                    'port' : environment['DOTCLOUD_MONGO_MONGODB_PORT'],
                    'user' : environment['DOTCLOUD_MONGO_MONGODB_LOGIN'],
                    'pass' : environment['DOTCLOUD_MONGO_MONGODB_PASSWORD']
                }
            break;
        }

        return cfg;
    },

    checkUrl: function(s){
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return regexp.test(s);
    },

    shorten: function(long_url, callback){
        if(this.checkUrl(long_url)){
            this.getModel(function(err, model){
                if(err){
                    callback(503);
                }else{
                    model.set(long_url, callback);
                }
            });
        }else{
            callback(500);
        }
    },

    expand: function(short_url, callback){
        this.getModel(function(err, model){
            if(err){
                callback(503);
            }else{
                model.get(short_url, callback);
            }
        });
    }
}