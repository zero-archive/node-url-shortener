var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , fakeredis;


Date.prototype.addDays = function(days)
{
  var dat = new Date(this.valueOf() + days * 24 * 60 * 60 * 1000 );
  return dat;
}

describe('Test Node Url Shortener without start_date and end_date - Nus', function () {
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
    short_url = 'foo';
    dateObject = {'start_date': "", 'end_date': ""};
    cNew = 'false';
  });

  it('should shorten', function (done) {
    nus.shorten(long_url, dateObject, cNew,  function (err, reply) {
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
          'start_date', datesObject.start_date,
          'end_date', datesObject.end_date,
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

describe('Test Node Url Shortener with start_date and end_date - Nus', function () {
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
    startDate = new Date();
    long_url = 'http://example.com';
    short_url = 'foo';
    dateObject = {'start_date': startDate, 'end_date': Date.addDays(2)};
    cNew = 'false';
  });

  it('should shorten', function (done) {
    nus.shorten(long_url, dateObject, cNew,  function (err, reply) {
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
          'start_date', datesObject.start_date,
          'end_date', datesObject.end_date,
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

