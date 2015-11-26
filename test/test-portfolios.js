var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";


describe('portfolios', function() {
  var client;

  beforeEach(function() {
    var LendingClub = require('../index');
    client = new LendingClub({
      baseUrl: TEST_URL
    });

    client.authenticate({
      key: 'KEY'
    });
  });

  it('should return the portfolios', function(done) {
    var scope = nock(TEST_URL)
      .get("/accounts/1/portfolios")
      .replyWithFile(200, __dirname + '/responses/portfolios.json');

    client.portfolios({
      investorId: "1"
    }, function(err, response) {
      expect(err).to.be.null;
      expect(response).to.not.be.null;
      expect(response.myPortfolios.length).to.equal(2);
      done();
    })
  });

  it('should throw if no investor id is included', function() {
    expect(function() {
      client.summary({}, function(){});
    }).to.throw(/investorId/);
  })
})
