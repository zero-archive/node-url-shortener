var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , RedisModel = require('../lib/redis-model.js');

describe('Test Node Url Shortener - RedisModel', function () {
  var redis, prefix;

  beforeEach(function() {
    redis = new RedisModel({ host: 'localhost', port: 6379 });
    prefix = RedisModel._prefix_;
  });

  it('kCounter', function (done) {
    var data = redis.kCounter();
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'counter');
    done();
  });

  it('kUrl', function (done) {
    var data = redis.kUrl('http://example.com');
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'url:a9b9f04336ce0181a08e774e01113b31');
    done();
  });

  it('kHash', function (done) {
    var data = redis.kHash('MQ==');
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'hash:MQ==');
    done();
  });

  it('md5', function (done) {
    var data = redis.md5('http://example.com');
    expect(data).to.be.a('string');
    expect(data).to.be('a9b9f04336ce0181a08e774e01113b31');
    done();
  });
})
