var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";


describe('loans', function() {
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

  it('should get all the listed loans', function(done) {
    var scope = nock(TEST_URL)
      .get("/loans/listing?showAll=true")
      .replyWithFile(200, __dirname + '/responses/loans_all.json');

    client.loans({
      investorId: 1,
      showAll: true
    }, function(err, response) {
      expect(scope.isDone()).to.be.true;
      expect(response.asOfDate).to.equal("2014-09-03T14:41:53.959-07:00");
      expect(response.loans[0].id).to.equal(111111);
      done();
    })
  });

  it('should still get loans if showAll is not defined', function(done) {
    var scope = nock(TEST_URL)
      .get("/loans/listing?showAll=")
      .replyWithFile(200, __dirname + '/responses/loans_all.json');

    client.loans({
      investorId: 1
    }, function(err, response) {
      expect(scope.isDone()).to.be.true;
      expect(response.asOfDate).to.equal("2014-09-03T14:41:53.959-07:00");
      expect(response.loans[0].id).to.equal(111111);
      done();
    });
  });

  it('should still get loans if showAll is false', function(done) {
    var scope = nock(TEST_URL)
      .get("/loans/listing?showAll=false")
      .replyWithFile(200, __dirname + '/responses/loans_all.json');

    client.loans({
      investorId: 1,
      showAll: false
    }, function(err, response) {
      expect(scope.isDone()).to.be.true;
      expect(response.asOfDate).to.equal("2014-09-03T14:41:53.959-07:00");
      expect(response.loans[0].id).to.equal(111111);
      done();
    });
  })
});
