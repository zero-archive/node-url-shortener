var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , RedisModel = require('../lib/redis-model.js');

var mock = function() {};

mock.prototype.incr = function(key, callback) {
  callback(null, 1);
};

mock.prototype.get = function(key, callback) {
  callback(null, 'http://example.com');
};

describe('Test Node Url Shortener - RedisModel', function () {
  var redis, prefix;

  before(function() {
    redis = new RedisModel({ host: 'localhost', port: 6379 });
    redis.db = new mock();
    prefix = RedisModel._prefix_;
  });

  it('kCounter should return Redis key', function (done) {
    var data = redis.kCounter();
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'counter');
    done();
  });

  it('kUrl should return Redis key', function (done) {
    var data = redis.kUrl('http://example.com');
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'url:a9b9f04336ce0181a08e774e01113b31');
    done();
  });

  it('kHash should return Redis key', function (done) {
    var data = redis.kHash('MQ==');
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'hash:MQ==');
    done();
  });

  it('md5 should return MD5 hash', function (done) {
    var data = redis.md5('http://example.com');
    expect(data).to.be.a('string');
    expect(data).to.be('a9b9f04336ce0181a08e774e01113b31');
    done();
  });

  it('uniqId should return unique Redis key', function (done) {
    redis.uniqId(function(err, hash) {
      expect(err).to.be(null);
      expect(hash).to.be.a('string');
      expect(hash).to.match(/[\w=]+/);
      done();
    });
  });

  it('findUrl should return Redis value', function (done) {
    redis.findUrl('foo', function(err, url) {
      expect(err).to.be(null);
      expect(url).to.be.a('string');
      expect(url).to.be('http://example.com');
      done();
    });
  });
})
