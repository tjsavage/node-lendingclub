var Loans = {}

Loans.loans = function(obj, cb) {
  var api = this._generateAPIGetter('/loans/listing?showAll={showAll!emptyIfUndefined}');
  api(obj, cb);
}

module.exports = Loans;
