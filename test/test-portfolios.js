var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";


describe('portfolios', function() {
  describe('getting portfolios', function() {
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
    });
  });

  describe('createPortfolio', function() {
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

    it('should correctly post with the basic JSON data needed', function(done) {
      var scope = nock(TEST_URL)
        .post("/accounts/1/portfolios", {
          aid: 1,
          portfolioName: "Portfolio 1",
          portfolioDescription: "abc"
        })
        .replyWithFile(200, __dirname + '/responses/createportfolio_success.json');

      client.createPortfolio({
        investorId: "1",
        aid: 1,
        portfolioName: "Portfolio 1",
        portfolioDescription: "abc"
      }, function(err, response) {
        expect(err).to.be.null;
        expect(response).to.not.be.null;
        expect(response.portfolioName).to.equal("Portfolio 1");
        done();
      })
    });

    it('should throw if missing an investorId', function() {
      expect(function() {
        client.createPortfolio({
          aid: 1,
          portfolioName: "Portfolio 1",
          portfolioDescription: "abc"
        }, function(err, response){})
      }).to.throw(/investorId/);
    });

    it('should throw if missing a portfolioName', function() {
      expect(function() {
        client.createPortfolio({
          investorId: "1",
          aid: 1,
          portfolioDescription: "abc"
        }, function(err, response){})
      }).to.throw(/portfolioName/);
    });

    it('should not throw if missing a portfolioDescription', function(done) {
      var scope = nock(TEST_URL)
        .post("/accounts/1/portfolios", {
          aid: 1,
          portfolioName: "Portfolio 1"
        })
        .replyWithFile(200, __dirname + '/responses/createportfolio_success.json');

      client.createPortfolio({
        investorId: "1",
        aid: 1,
        portfolioName: "Portfolio 1"
      }, function(err, response) {
        expect(err).to.be.null;
        expect(response).to.not.be.null;
        expect(response.portfolioName).to.equal("Portfolio 1");
        done();
      });
    });

    it('should correctly capture and callback the JSON response for an error', function(done) {
      var scope = nock(TEST_URL)
        .post("/accounts/1/portfolios", {
          aid: 1,
          portfolioName: "Portfolio 1",
          portfolioDescription: "abc"
        })
        .replyWithFile(400, __dirname + '/responses/createportfolio_failure.json');

      client.createPortfolio({
        investorId: "1",
        aid: 1,
        portfolioName: "Portfolio 1",
        portfolioDescription: "abc"
      }, function(err, response) {
        expect(err).to.be.null;
        expect(response).to.not.be.null;
        expect(response.errors.length).to.equal(1);
        done();
      });
    });
  });

})
