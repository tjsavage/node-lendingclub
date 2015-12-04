var Portfolios = {}

Portfolios.portfolios = function(obj, cb) {
  var api = this._generateAPIGetter('/accounts/{investorId}/portfolios');
  api(obj, cb);
}

Portfolios.createPortfolio = function(obj, cb) {
  if (!obj || !obj.investorId) {
    throw new Error("Missing an investorId");
  }

  var aid = obj.aid;
  var portfolioName = obj.portfolioName;
  var portfolioDescription = obj.portfolioDescription;
  var url = "/accounts/" + obj.investorId + "/portfolios";

  if (typeof portfolioName == 'undefined') {
    throw new Error("Missing a portfolioName");
  }

  if (typeof aid == 'undefined') {
    throw new Error("Missing aid");
  }

  if (typeof aid != 'number') {
    throw new Error("aid not a number");
  }

  this._makeRequest({
    url: url,
    method: "POST",
    body: {
      aid: aid,
      portfolioName: portfolioName,
      portfolioDescription: portfolioDescription
    }
  }, function(err, body) {
    cb(err, body);
  });
}

module.exports = Portfolios;
