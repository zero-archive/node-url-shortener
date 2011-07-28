module.exports = {
    // Nodejs server config
    'url'    : 'http://localhost:8080/',
    'host'   : false,
    'port'   : 8080,
    'dbtype' : 'redis', // 'mongo' or 'redis'

    'dotcloud' : false, // use DotCloud environment

    // Redis config
    'redis' : {
        'host' : 'localhost',
        'port' : 6379,
        'pass' : false
    },

    // Mongo config
    'mongo' : {
        'host' : 'localhost',
        'port' : 27017,
        'user' : false,
        'pass' : false
    }
}