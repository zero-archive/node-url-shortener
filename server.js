// Include modules
var config = require('./lib/get-config'),
    nus = require('./lib/nus'),
    connect = require('connect'),
    express = require('express'),
    assetManager = require('connect-assetmanager'),
    assetHandler = require('connect-assetmanager-handlers'),
    app = express.createServer();

// Gotta Catch 'Em All
process.addListener('uncaughtException', function (err, stack) {
    console.log('Caught exception: ' + err + '\n' + err.stack);
    console.log('\u0007'); // Terminal bell
});

// Session store
var RedisStore = require('connect-redis')(express);
var sessionStore = new RedisStore(config.redis);

// Setup groups for CSS / JS assets
var assetsSettings = {
    'js': {
        'route': /\/static\/js\/[a-z0-9]+\/.*\.js/,
        'path': './public/js/',
        'dataType': 'javascript',
        'files': [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js',
            'client.js'
        ],
        'debug': true,
        'postManipulate': {
            '^': [
                assetHandler.uglifyJsOptimize
            ]
        }
    },
    'css': {
        'route': /\/static\/css\/[a-z0-9]+\/.*\.css/,
        'path': './public/css/',
        'dataType': 'css',
        'files': [
            'reset.css',
            'style.css'
        ],
        'debug': true,
        'postManipulate': {
            '^': [
                assetHandler.fixVendorPrefixes,
                assetHandler.fixGradients,
                assetHandler.replaceImageRefToBase64(__dirname+'/public'),
                assetHandler.yuiCssOptimize
            ]
        }
    }
};

var assetsMiddleware = assetManager(assetsSettings);

// Settings
app.configure(function() {
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/views');
});

// Middleware
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(assetsMiddleware);
    app.use(express.session({
        'store': sessionStore,
        'secret': config.sessionSecret
    }));
    app.use(express.logger({format: ':response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer'}));
    app.use(express['static'](__dirname+'/public', {maxAge: 86400000}));
});

// ENV based configuration

// Show all errors and keep search engines out using robots.txt
app.configure('development', function() {
    app.use(express.errorHandler({
        'dumpExceptions': true,
        'showStack': true
    }));
    app.all('/robots.txt', function(req,res) {
        res.send('User-agent: *\nDisallow: /', {'Content-Type': 'text/plain'});
    });
});

// Suppress errors, allow all search engines
app.configure('production', function() {
    app.use(express.errorHandler());
    app.all('/robots.txt', function(req,res) {
        res.send('User-agent: *', {'Content-Type': 'text/plain'});
    });
});

// Template helpers
app.dynamicHelpers({
    'assetsCacheHashes': function(req, res) {
        return assetsMiddleware.cacheHashes;
    },
    'session': function(req, res) {
        return req.session;
    }
});

// Error handling
app.error(function(err, req, res, next) {
    console.log(err);

    if (err instanceof NotFound) {
        res.render('errors/404');
    } else {
        res.render('errors/500');
    }
});

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

// Routing
app.all('/', function(req, res) {
    res.render('index');
});

app.all('/api/v1/:link', function(req, res) {
    var response = {},
        status_codes = {
        200 : 'OK',
        500 : 'INVALID_URI',
        503 : 'UNKNOWN_ERROR'
    }

    res.contentType('application/json');

    switch(req.params['link']){
        case 'shorten':
            nus.shorten(req.param('long_url'), function(err, reply){
                if(err){
                    response = {
                        'status_code' : (status_codes[err]) ? err : 503,
                        'status_txt'  : (status_codes[err]) ? status_codes[err] : status_codes[503]
                    }
                }else{
                    response = {
                        'status_code' : 200,
                        'status_txt'  : status_codes[200],
                        'hash'        : reply.hash,
                        'url'         : config.uri + '/' + reply.hash,
                        'long_url'    : reply.long_url
                    }
                }

                res.send(response, response.status_code);
            });
        break;
        case 'expand':
            nus.expand(req.param('short_url'), function(err, reply){
                if(err){
                    response = {
                        'status_code' : (status_codes[err]) ? err : 503,
                        'status_txt'  : (status_codes[err]) ? status_codes[err] : status_codes[503]
                    }
                }else{
                    response = {
                        'status_code' : 200,
                        'status_txt'  : status_codes[200],
                        'hash'        : reply.hash,
                        'url'         : config.uri + '/' + reply.hash,
                        'long_url'    : reply.long_url
                    }
                }

                res.send(response, response.status_code);
            });
        break;
        default:
            response = {
                'status_code' : 500,
                'status_txt'  : status_codes[500]
            }

            res.send(response, response.status_code);
    }
});

app.all('/:link', function(req, res) {
    if((/^(\w+)$/i).test(req.params['link'])){
        nus.expand(req.params['link'], function(err, reply){
            if(err){
                res.redirect('/');
            }else{
                res.redirect(reply.long_url, 301);
            }
        });
    }
});

// If all fails, hit em with the 404
app.all('*', function(req, res){
    throw new NotFound;
});

app.listen(config.port, config.host);
console.log('Running in '+(process.env.NODE_ENV || 'development')+' mode @ ' + config.uri);