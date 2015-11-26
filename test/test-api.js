var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";

describe('api', function() {
  describe('_generateAPIGetter', function() {
    var api;

    beforeEach(function() {
      api = require('../src/api');
    });

    it('should correctly return a function that calls _makeRequest on this with the correct params', function(done) {
      var fakeThis = {
        settings: {
          baseUrl: TEST_URL
        },
        _makeRequest: sinon.spy()
      };
      // want to make sure when bound gets called, _makeRequest gets called with the right params
      var bound = api._generateAPIGetter.bind(fakeThis, "accounts/{investorId}/test");
      var apiGetter = bound();

      apiGetter({
        investorId: "1"
      }, function() {});

      expect(fakeThis._makeRequest.args[0][0].url).to.equal("accounts/1/test");
      expect(fakeThis._makeRequest.args[0][0].method).to.equal("GET");
      done();
    })
  })
})
