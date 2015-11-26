var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";


describe('detailednotes', function() {
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

  it('should return the detailed notes', function(done) {
    var scope = nock(TEST_URL)
      .get("/accounts/1/detailednotes")
      .replyWithFile(200, __dirname + '/responses/detailednotes.json');

    client.detailednotes({
      investorId: "1"
    }, function(err, response) {
      expect(err).to.be.null;
      expect(response).to.not.be.null;
      expect(response.myNotes.length).to.equal(2);
      done();
    })
  });

  it('should throw if no investor id is included', function() {
    expect(function() {
      client.summary({}, function(){});
    }).to.throw(/investorId/);
  })
})
