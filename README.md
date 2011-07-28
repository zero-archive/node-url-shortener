Node Url Shortener
==================

URL Shortener using NodeJS and Redis or MongoDB.

## Dependencies

*  https://github.com/visionmedia/express
*  https://github.com/mranney/node_redis (for Redis)
*  https://github.com/christkv/node-mongodb-native (for MongoDB)

## Config

The main configuration file is named config.js. This file can be found in `./lib/config.js`.

## Using

    $ node index.js
    Server running at http://127.0.0.1:8888/

## Using on DotCloud service

*  Copy all files from `./dotcloud/` folder to the root
*  Set `dotcloud` to `true` in `./lib/config.js` file

    $ dotcloud create <repo-name>
    $ dotcloud push <repo-name

