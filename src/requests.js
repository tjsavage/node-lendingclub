var request = require('request');

var Requests = {};

/**
* Makes an authenticated request to "this.settings.baseUrl + url"
*
* @param options Object of options, which must include method and url, and optionally body
* @param cb Callback expecting parameters function(err, data)
*/
Requests._makeRequest = function(options, cb) {
  if (typeof options == 'undefined') {
    throw new Error("Must include an options object for the response");
  }

  var method = options.method;
  var url = options.url;

  if (!method || (method != "POST" && method != "GET")) {
    throw new Error("Invalid request method: ", method);
  }

  if (!url) {
    throw new Error("Invalid URL");
  }

  if (!this._auth || !this._auth.key) {
    throw new Error("No auth key, must call client.authenticate() first");
  }


  var headers = {
    "Accept": "application/json",
    "Authorization": this._auth.key
  };

  if (method == "POST") {
    headers['Content-type'] = "application/json"
  }

  var requestOptions = {
    json: true,
    method: method,
    uri: this.settings.baseUrl + url,
    headers: headers
  };

  if (method == "POST") {
    requestOptions.body = options.body;
  }

  request(requestOptions, function(error, response, body) {
    cb(error, body);
  })
}

module.exports = Requests;
