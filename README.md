node-url-shortener
==================

Сокращатель ссылок на `node.js`, `express` и `redis`.

##  Зависимости

Пакет `redis - a node.js redis client`.

    npm install redis

Пакет `express framework`.

    npm install express

## Использование

Настройки хранятся в файле `./lib/config.js`

Запуск сервера:

    $ node index.js
    Server running at http://127.0.0.1:8888/

Запуск на DotCoud

    $ dotcloud create <repo-name>
    $ dotcloud push <repo-name> .

## TODO

*  Собственные имена ссылок
