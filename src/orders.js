var Orders = {};

Orders.submitOrders = function(obj, cb) {
  if (!obj || !obj.investorId) {
    throw new Error("Missing an investorId");
  }

  var aid = obj.aid;
  var orders = obj.orders;

  var url = "/accounts/" + obj.investorId + "/orders";

  if (typeof orders == 'undefined') {
    throw new Error("Missing orders");
  }

  if (!orders.length) {
    throw new Error("No orders in list");
  }

  if (typeof aid == 'undefined') {
    throw new Error("Missing aid");
  }

  for(var i = 0; i < orders.length; i++) {
    var order = orders[i];
    Orders._validateOrderObj(order);
  }

  this._makeRequest({
    url: url,
    method: "POST",
    body: {
      aid: aid,
      orders: orders
    }
  }, function(err, body) {
    cb(err, body);
  });
}

Orders._validateOrderObj = function(obj) {
  if (typeof obj.loanId == 'undefined') {
    console.log(obj);
    throw new Error("No loanId in order");
  }

  if (typeof obj.requestedAmount == 'undefined') {
    throw new Error("No requestedAmount in order");
  }
}

module.exports = Orders;
