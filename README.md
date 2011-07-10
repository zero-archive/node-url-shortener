node-url-shortener
==================

Сокращатель ссылок на `node.js` и `redis`.

##  Зависимости

Для коккректной работы необходим пакет `redis - a node.js redis client`. Для установки выполнить:

    npm install redis
    
## Использование

Запуск сервера:

    $ node index.js
    Server running at http://127.0.0.1:8888/

Сокращение ссылка 

    http://127.0.0.1:8888/?url=http://example.com

Сервер вернет короткую ссылку

## TODO

*  RESTful api
*  Шаблоны
*  Собственные имена ссылок
