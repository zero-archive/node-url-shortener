Node Url Shortener
==================

URL Shortener using NodeJS and Redis or MongoDB.

### Install on dev machine

*  git clone https://github.com/dotzero/node-url-shortener myproject
*  cd myproject
*  npm install
*  edit config.js # update config for your use case
*  node server.js

### Install on DotCloud service

*  git clone https://github.com/dotzero/node-url-shortener myproject
*  cd myproject
*  cp ./dotcloud/ ./
*  edit config.js # set `dotcloud` to `true`
*  dotcloud create <repo-name>
*  dotcloud push <repo-name
