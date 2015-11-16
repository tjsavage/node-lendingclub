var mocha = require('mocha');
var chai = require('chai');

var expect = chai.expect;

describe('basics', function() {
  describe('mixing prototypes', function() {
    it('should successfull mix in the authenticate function', function() {
      var LendingClub = require('../index');

      var client = new LendingClub();

      expect(client.authenticate).to.not.be.null;

      client.authenticate({
        test: "test"
      });

      expect(client._auth.test).to.equal("test");
    })
  });

  describe('setting settings', function() {
    it('should successfully extend the settings object', function() {
      var LendingClub = require('../index');

      var client = new LendingClub({
        "a": "a"
      });

      expect(client.settings).to.not.be.null;
      expect(client.settings.a).to.equal("a");
      expect(client.settings.baseUrl).to.not.be.null;
    });

    it('should overwrite baseUrl and not overwrite the default', function(){
      var LendingClub = require('../index');

      var client = new LendingClub({
        baseUrl: "https://dummy"
      });

      expect(client.settings).to.not.be.null;
      expect(client.settings.baseUrl).to.equal("https://dummy");

      var clientB = new LendingClub();
      expect(clientB.settings.baseUrl).to.equal("https://api.lendingclub.com/api/investor/v1");
    })
  })
})
