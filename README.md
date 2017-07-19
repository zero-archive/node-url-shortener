# Go Better: A hackweek project to improve go/ links.

> Based on a lightweight node URL shortener (https://github.com/dotzero/node-url-shortener)

## Quick Start

```bash
$ git clone https://github.com/optimizely/gobetter.git
$ cd gobetter
$ npm i
$ node app
```

## Command Line Options

```bash
$ node app -h

Usage: app [options]

Options:
  -u, --url     Application URL               [default: "http://127.0.0.1:3000"]
  -p, --port    Port number for the Express application          [default: 3000]
  --redis-host  Redis Server hostname                     [default: "localhost"]
  --redis-port  Redis Server port number                         [default: 6379]
  --redis-pass  Redis Server password                           [default: false]
  --redis-db    Redis DB index                                      [default: 0]
  -h, --help    Show help                                              [boolean]
```

## Installation on production

```bash
$ git clone https://github.com/dotzero/node-url-shortener nus
$ cd nus
$ npm install --production
$ NODE_ENV=production node app --url "http://example.com"
```

# RESTful API

`POST /api/v1/shorten` with form data `long_url=http://google.com`

```json
{
  "hash": "rnRu",
  "long_url": "http://google.com",
  "short_url": "http://127.0.0.1:3000/rnRu",
  "status_code": 200,
  "status_txt": "OK"
}
```

`GET /api/v1/expand/:hash` with query `rnRu`

```json
{
  "clicks": "1",
  "hash": "rnRu",
  "long_url": "http://google.com",
  "status_code": 200,
  "status_txt": "OK"
}
```

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License

Released under [the MIT license](LICENSE)
