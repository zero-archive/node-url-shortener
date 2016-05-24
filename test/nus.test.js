var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , fakeredis;

describe('Test Node Url Shortener - Nus', function () {
  var nus
    , long_url
    , short_url;

  beforeEach(function() {
    fakeredis = require('fakeredis').createClient(0, 'localhost', {fast : true});
    nus = require('../lib/nus')();
    nus.getModel = function (callback) {
      var RedisModel = require('../lib/redis-model.js');
      callback(null, new RedisModel(null, fakeredis));
    };
    long_url = 'http://example.com';
    short_url = 'foo'
  });

  it('should shorten', function (done) {
    nus.shorten(long_url, function (err, reply) {
      expect(err).to.be(null);
      expect(reply).to.not.be.empty();
      expect(reply).to.only.have.keys('hash', 'long_url');
      expect(reply.hash).to.match(/[\w=]+/);
      expect(reply.long_url).to.be(long_url);
      done();
    });
  });

  it('should expand', function (done) {
    nus.getModel(function (err, redis) {
      fakeredis.multi([
        ['set', redis.kUrl(long_url), short_url],
        ['hmset', redis.kHash(short_url),
          'url', long_url,
          'hash', short_url,
          'clicks', 1
        ]
      ]).exec(function (err, replies) {

        nus.shorten(long_url, function (err, reply) {
          expect(err).to.be(null);
          expect(reply).to.not.be.empty();
          expect(reply).to.only.have.keys('hash', 'long_url');
          expect(reply.hash).to.match(/[\w=]+/);
          expect(reply.long_url).to.be(long_url);
          done();
        });

      });
    });
  });
})
