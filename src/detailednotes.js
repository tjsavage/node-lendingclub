var DetailedNotes = {}

DetailedNotes.detailednotes = function(obj, cb) {
  var api = this._generateAPIGetter('/accounts/{investorId}/detailednotes');
  api(obj, cb);
}

module.exports = DetailedNotes;
