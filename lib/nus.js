/**
 * node-url-shortener controller
 */
var config = require('./config');

module.exports = { 
    getModel: function(callback){
        switch(config.dbtype){
            case 'redis': 
                var RedisModel = require('./redis-model');
                callback(null, new RedisModel(config.redis));
            break;
            case 'mongo': 
                var MongoModel = require('./mongo-model');
                callback(null, new MongoModel(config.mongo));
            break;
            default: 
                callback(503);
        }
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