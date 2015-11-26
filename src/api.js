var format = require('string-format');

format.extend(String.prototype, {
  emptyIfUndefined: function(s) {
    if (typeof s == 'undefined') {
      return '';
    }
    return s;
  }
})

var API = {};

API._generateAPIGetter = function(urlFormatString) {
  var self = this;

  return function(obj, cb) {
    if (!obj || !obj.investorId) {
      throw new Error("Missing an investorId");
    }

    var url = format(urlFormatString, obj);

    self._makeRequest({
      url: url,
      method: "GET"
    }, function(err, body) {
      cb(err, body);
    });
  }
}

module.exports = API;
