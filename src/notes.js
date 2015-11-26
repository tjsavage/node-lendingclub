var Notes = {}

Notes.notes = function(obj, cb) {
  var api = this._generateAPIGetter('/accounts/{investorId}/notes');
  api(obj, cb);
}

module.exports = Notes;
