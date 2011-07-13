var config = {}

// Nodejs server config
config.host = 'localhost';
config.port = 8080;
config.dbtype = 'mongo' // 'mongo' or 'redis'

// Redis config
config.redis = {}
config.redis.host = 'localhost';
config.redis.port = 6379;
config.redis.auth = false;

// Mongo config
config.mongo = {}
config.mongo.host = 'localhost';
config.mongo.port = 27017;
config.mongo.db   = 'nus';


module.exports = config;