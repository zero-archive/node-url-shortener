var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , RedisModel = require('../lib/redis-model.js')
  , fakeredis;

describe('Test Node Url Shortener - RedisModel', function () {
  var redis
    , prefix
    , long_url
    , short_url;

  beforeEach(function() {
    fakeredis = require('fakeredis').createClient(0, 'localhost', {fast : true});
    redis = new RedisModel(null, fakeredis);
    prefix = RedisModel._prefix_;
    long_url = 'http://example.com';
    short_url = 'foo'
  });

  it('kCounter should return Redis key', function (done) {
    var data = redis.kCounter();
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'counter');
    done();
  });

  it('kUrl should return Redis key', function (done) {
    var data = redis.kUrl(long_url);
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'url:a9b9f04336ce0181a08e774e01113b31');
    done();
  });

  it('kHash should return Redis key', function (done) {
    var data = redis.kHash(short_url);
    expect(data).to.be.a('string');
    expect(data).to.be(prefix + 'hash:foo');
    done();
  });

  it('md5 should return MD5 hash', function (done) {
    var data = redis.md5(long_url);
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
    fakeredis.multi([
      ['set', redis.kUrl(long_url), short_url],
      ['hmset', redis.kHash(short_url),
        'url', long_url,
        'hash', short_url,
        'clicks', 1
      ]
    ]).exec(function (err, replies) {

      redis.findUrl(long_url, function(err, reply) {
        expect(err).to.be(null);
        expect(reply).to.be.a('string');
        expect(reply).to.be(short_url);
        done();
      });

    });
  });

  it('findHash should return Redis value', function (done) {
    fakeredis.multi([
      ['set', redis.kUrl(long_url), short_url],
      ['hmset', redis.kHash(short_url),
        'url', long_url,
        'hash', short_url,
        'clicks', 1
      ]
    ]).exec(function (err, replies) {

      redis.findHash(short_url, function(err, reply) {
        expect(err).to.be(null);
        expect(reply).to.not.be.empty();
        expect(reply).to.only.have.keys('clicks', 'hash', 'url');
        expect(reply.hash).to.be(short_url);
        expect(reply.url).to.be(long_url);
        done();
      });

    });
  });

  it('clickLink should return 2', function (done) {
    fakeredis.multi([
      ['set', redis.kUrl(long_url), short_url],
      ['hmset', redis.kHash(short_url),
        'url', long_url,
        'hash', short_url,
        'clicks', 1
      ]
    ]).exec(function (err, replies) {

      redis.clickLink(short_url, function(err, reply) {
        expect(err).to.be(null);
        expect(reply).to.be(2)
        done();
      });

    });
  });

  it('set should return Redis value', function (done) {
    redis.set(long_url, function(err, reply) {
      expect(err).to.be(null);
      expect(reply).to.not.be.empty();
      expect(reply).to.only.have.keys('hash', 'long_url');
      expect(reply.hash).to.be(short_url);
      expect(reply.long_url).to.be(long_url);
      done();
    });
  });

  it('get should return Redis value', function (done) {
    fakeredis.multi([
      ['set', redis.kUrl(long_url), short_url],
      ['hmset', redis.kHash(short_url),
        'url', long_url,
        'hash', short_url,
        'clicks', 1
      ]
    ]).exec(function (err, replies) {

      redis.get(short_url, function(err, reply) {
        expect(err).to.be(null);
        expect(reply).to.not.be.empty();
        expect(reply).to.only.have.keys('hash', 'long_url', 'clicks');
        expect(reply.hash).to.be(short_url);
        expect(reply.long_url).to.be(long_url);
        done();
      });

    });
  });
})
