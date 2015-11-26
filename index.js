var API = require('./src/api');
var Authenticate = require('./src/authenticate');
var Requests = require('./src/requests');
var Summary = require('./src/summary');
var AvailableCash = require('./src/availablecash');
var Notes = require('./src/notes');
var DetailedNotes = require('./src/detailednotes');
var Portfolios = require('./src/portfolios');
var Orders = require('./src/orders');

function extendPrototype(constructor, mix) {
  for(var i in mix) {
    if(mix.hasOwnProperty(i)) {
      constructor.prototype[i] = mix[i]
    }
  }
}

function extendObject(origin, add) {
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while(i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

var DEFAULT_SETTINGS = {
  baseUrl: "https://api.lendingclub.com/api/investor/v1"
}

var Client = function Client(settings) {
  this.settings = {};
  extendObject(this.settings, DEFAULT_SETTINGS);
  extendObject(this.settings, settings);
}

extendPrototype(Client, API);
extendPrototype(Client, Authenticate);
extendPrototype(Client, Requests);
extendPrototype(Client, Summary);
extendPrototype(Client, AvailableCash);
extendPrototype(Client, Notes);
extendPrototype(Client, DetailedNotes);
extendPrototype(Client, Portfolios);
extendPrototype(Client, Orders);

module.exports = Client;
