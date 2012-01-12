var settings = {
    'host' : 'localhost',
    'port': 8080,
    'dbtype' : 'redis',
    'sessionSecret': 'sessionSecret',
    'uri': 'http://localhost:8080', // Without trailing slash /
    'dotcloud' : false
};

// Redis config
settings.redis = {
    'host' : 'localhost',
    'port' : 6379,
    'pass' : false
};

// Mongo config
settings.mongo = {
    'host' : 'localhost',
    'port' : 27017,
    'user' : false,
    'pass' : false
};

module.exports = settings;