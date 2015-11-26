var mocha = require('mocha');
var chai = require('chai');
var nock = require('nock');

nock.disableNetConnect();

var expect = chai.expect;

var TEST_URL = "http://localhost";


describe('orders', function() {
  describe('submitting orders', function() {
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

    it('should post a new order with the correct arguments', function(done) {
      var scope = nock(TEST_URL)
        .post("/accounts/1/orders", {
          aid: 11111,
          orders: [
            {
              loanId: 22222,
              requestedAmount: 55.0,
              portfolioId: 44444
            },
            {
              loanId: 33333,
              requestedAmount: 25,
              portfolioId: 55555
            },
            {
              loanId: 44444,
              requestedAmount: 25
            }
          ]
        })
        .replyWithFile(200, __dirname + '/responses/orders_success.json');

      client.submitOrders({
        investorId: "1",
        aid: 11111,
        orders: [
          {
            loanId: 22222,
            requestedAmount: 55.0,
            portfolioId: 44444
          },
          {
            loanId: 33333,
            requestedAmount: 25,
            portfolioId: 55555
          },
          {
            loanId: 44444,
            requestedAmount: 25
          }
        ]
      }, function(err, response) {
        expect(err).to.be.null;
        expect(response).to.not.be.null;
        expect(response.orderConfirmations.length).to.equal(3);
        done();
      })
    });

    it('should throw if there are no orders', function() {
      expect(function() {
        client.submitOrders({
          investorId: "1",
          aid: 1111
        }, function(){})
      }).to.throw(/order/);
    });

    it('should throw if an order is missing a requestedAmount', function() {
      expect(function() {
        client.submitOrders({
          investorId: "1",
          aid: 1111,
          orders: [
            {
              loanId: 2222,
              requestedAmount: 55
            },
            {
              loanId: 3333
            }
          ]
        }, function(){})
      }).to.throw(/requestedAmount/);
    });

    it('should throw if an order is missing a loanId', function() {
      expect(function() {
        client.submitOrders({
          investorId: "1",
          aid: 1111,
          orders: [
            {
              loanId: 2222,
              requestedAmount: 55
            },
            {
              requestedAmount: 66
            }
          ]
        }, function(){})
      }).to.throw(/loanId/);
    });

    it('should throw if missing an aid', function() {
      expect(function() {
        client.submitOrders({
          investorId: "1",
          orders: [
            {
              loanId: 2222,
              requestedAmount: 55
            },
            {
              loanId: 3333
            }
          ]
        }, function(){})
      }).to.throw(/aid/);
    });


  });
});
