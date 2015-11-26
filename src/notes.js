var Notes = {}

Notes.notes = function(obj, cb) {
  if (!obj || !obj.investorId) {
    throw new Error("Missing an investorId");
  }

  var url = "/accounts/" + obj.investorId + "/notes";

  this._makeRequest(url, "GET", function(err, body) {
    cb(err, body);
  });
}

module.exports = Notes;