var config = {}

// Nodejs server config
config.host = '127.0.0.1';
config.port = 8080;

// Redis config
config.redis = {}
config.redis.host = '127.0.0.1';
config.redis.port = 6379;
config.redis.auth = false;


module.exports = config;