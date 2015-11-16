var request = require('request');

var Requests = {};

/**
* Makes an authenticated request to "this.settings.baseUrl + url"
*
* @param cb Callback expecting parameters function(err, data)
*/
Requests._makeRequest = function(url, method, cb) {
  if (!method || (method != "POST" && method != "GET")) {
    throw new Error("Invalid request method: ", method);
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

  request({
    method: method,
    uri: this.settings.baseUrl + url,
    headers: headers
  }, function(error, response, body) {
    var responseObj;
    
    if(body != null && body.length > 0) {
      var responseObj = JSON.parse(body);
    }

    cb(error, responseObj);
  })
}

module.exports = Requests;
