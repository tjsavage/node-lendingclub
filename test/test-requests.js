var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";

describe('requests', function() {
  describe('_makeRequest', function() {
    describe('unauthenticated client', function() {
      var client;

      beforeEach(function() {
        var LendingClub = require('../index');
        client = new LendingClub({
          baseUrl: TEST_URL
        });
      });

      it('should throw an error', function() {
        expect(function() {
          client._makeRequest({
            url: '/test',
            method: 'GET'
          });
        }).to.throw(/authenticate/);

      })
    })

    describe('authenticated client', function() {
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

      it('should make a get request with the right headers', function(done) {
        var scope = nock(TEST_URL)
          .get('/test')
          .matchHeader('Authorization', 'KEY')
          .reply(200);

        client._makeRequest({
          url: '/test',
          method: 'GET'
        }, function(err, res) {
          expect(err).to.be.null;
          expect(scope.isDone()).to.be.true;
          done();
        });
      });

      it('should parse the JSON response to an object', function(done) {
        var scope = nock(TEST_URL)
          .get('/test')
          .replyWithFile(200, __dirname + '/responses/summary.json');

        client._makeRequest({
          url: '/test',
          method: 'GET'
        }, function(err, res) {
          expect(err).to.be.null;
          expect(scope.isDone()).to.be.true;
          expect(res.availableCash).to.equal(2077.21);
          done();
        });
      })
    })

  })
})
