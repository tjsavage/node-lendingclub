var Authenticate = require('./src/authenticate');
var Requests = require('./src/requests');
var Summary = require('./src/summary');

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

extendPrototype(Client, Authenticate);
extendPrototype(Client, Requests);
extendPrototype(Client, Summary);

module.exports = Client;
