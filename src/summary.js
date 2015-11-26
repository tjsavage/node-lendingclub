var Summary = {}

Summary.summary = function(obj, cb) {
  var api = this._generateAPIGetter('/accounts/{investorId}/summary');
  api(obj, cb);
}

module.exports = Summary;
