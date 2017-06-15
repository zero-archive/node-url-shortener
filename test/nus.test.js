var request = require('superagent')
  , mock = require('superagent-mocker')(request)
  , expect = require('expect.js')
  , fakeredis;

function addDays(n){
  var t = new Date();
  t.setDate(t.getDate() + n);
  var date = ((t.getDate() < 10) ?  '0'+t.getDate() : t.getDate())+"/"+(((t.getMonth() + 1) < 10 ) ? '0'+(t.getMonth()+1) : (t.getMonth()+1))+"/"+t.getFullYear();
  return date;
}

describe('Test Node Url Shortener without start_date and end_date - Nus', function () {
  var nus
    , long_url
    , short_url
    , dateObject = {};

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
    nus.shorten(long_url, dateObject.start_date, dateObject.end_date, cNew,  function (err, reply) {
      console.log(err);
      expect(err).to.be(null);
      expect(reply).to.not.be.empty();
      expect(reply).to.only.have.keys('hash', 'long_url', 'short_url');
      expect(reply.hash).to.match(/[\w=]+/);
      expect(reply.long_url).to.be(long_url);
      done();
    });
  });

  it('should expand', function (done) {
    nus.getModel(short_url, function (err, redis) {
      fakeredis.multi([
        ['set', redis.kUrl(long_url), short_url],
        ['hmset', redis.kHash(short_url),
          'url', long_url,
          'hash', short_url,
          'start_date', dateObject.start_date,
          'end_date', dateObject.end_date,
          'clicks', 1
        ]
      ]).exec(function (err, replies) {

        nus.shorten(long_url, function (err, reply) {
          expect(err).to.be(null);
          expect(reply).to.not.be.empty();
          expect(reply).to.only.have.keys('hash', 'long_url', 'short_url', 'start_date', 'end_date', 'clicks', 'status_code', 'status_txt');
          expect(reply.hash).to.match(/[\w=]+/);
          expect(reply.long_url).to.be(long_url);
          done();
        });

      });
    });
  });
});




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
    dateObject = {'start_date': startDate, 'end_date': addDays(startDate, 2)};
    cNew = 'true';
  });

  it('should shorten', function (done) {
    nus.shorten(long_url, dateObject.start_date, dateObject.end_date, cNew,  function (err, reply) {
      expect(err).to.be(null);
      expect(reply).to.not.be.empty();
      expect(reply).to.only.have.keys('hash', 'long_url', 'short_url', 'status_code', 'status_txt');
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
          'start_date', dateObject.start_date,
          'end_date', dateObject.end_date,
          'clicks', 1
        ]
      ]).exec(function (err, replies) {

        nus.shorten(long_url, function (err, reply) {
          expect(err).to.be(null);
          expect(reply).to.not.be.empty();
          expect(reply).to.only.have.keys('hash', 'long_url', 'short_url', 'start_date', 'end_date', 'clicks', 'status_code', 'status_txt');
          expect(reply.hash).to.match(/[\w=]+/);
          expect(reply.long_url).to.be(long_url);
          done();
        });

      });
    });
  });
})

