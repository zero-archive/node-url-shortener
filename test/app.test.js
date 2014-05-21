var superagent = require('superagent')
  , expect = require('expect.js');

describe('NUS rest api', function () {
  var id;

  it('shorten link', function (done) {
    superagent.post('http://localhost:3000/api/v1/shorten')
      .send({
        long_url: 'https://www.google.com'
      })
      .end(function (res) {
        // console.log(res.body);
        expect(res.ok).to.be(true);
        expect(res.body).to.an('object');
        expect(res.body).not.to.be.empty();
        expect(res.body).to.have.keys('hash', 'long_url', 'short_url', 'status_code', 'status_txt');
        id = res.body.hash;
        done();
      })
  });

  it('expand link', function(done){
    superagent.post('http://localhost:3000/api/v1/expand')
      .send({
        short_url: id
      })
      .end(function (res) {
        // console.log(res.body);
        expect(res.ok).to.be(true);
        expect(res.body).to.an('object');
        expect(res.body).not.to.be.empty();
        expect(res.body).to.have.keys('hash', 'long_url', 'clicks', 'status_code', 'status_txt');
        done();
      })
  });
})
