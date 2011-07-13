node-url-shortener
==================

Сокращатель ссылок на `node.js`, `express` 
Тип базыданных `redis` и `mongo`.

##  Зависимости

Пакет `express framework`.

    npm install express

Для использования `redis`. Пакет `redis - a node.js redis client`.

    npm install redis

Для использования `mongo`. Пакет `node-mongodb-native`.

    npm install mongodb

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
