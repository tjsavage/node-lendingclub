var strformat = require('strformat');

var API = {};

API._generateAPIGetter = function(urlFormatString) {
  var self = this;

  return function(obj, cb) {
    if (!obj || !obj.investorId) {
      throw new Error("Missing an investorId");
    }

    var url = strformat(urlFormatString, obj);

    self._makeRequest({
      url: url,
      method: "GET"
    }, function(err, body) {
      cb(err, body);
    });
  }
}

module.exports = API;
