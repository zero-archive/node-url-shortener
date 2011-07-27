// Include modules
var config = require('./lib/config'),
    nus = require('./lib/nus');
    express = require('express'),
    app = express.createServer();

// Middleware
app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});

// Status codes
var status_codes = {
    200 : 'OK',
    500 : 'INVALID_URI',
    503 : 'UNKNOWN_ERROR'
}

// Api
app.get('/api/v1/:link', function(req, res){
    var response = {}

    res.contentType('application/json');

    switch(req.params['link']){
        // http://localhost:8080/api/v1/shorten/?long_url=http://www.google.com/
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
                        'url'         : config.url + reply.hash,
                        'long_url'    : reply.long_url
                    }
                }

                res.send(response, response.status_code);
            });
        break;
        // http://localhost:8080/api/v1/expand/?short_url=MQ
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
                        'url'         : config.url + reply.hash,
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

// Index
app.get('/:link', function(req, res){
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

app.listen(config.port, config.host);

console.log('Server running at http://' + ((config.host) ? config.host : 'localhost') + ':' + config.port + '/');