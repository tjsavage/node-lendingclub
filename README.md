# node-lendingclub
Node module for accessing the Lending Club API

### Usage

  var LendingClub = require('node-lendingclub')

  var client = new LendingClub();

  client.authenticate({
    key: "AUTHKEY"
  });

  client.summary({
    investorId: "investorId"
  });

  client.availablecash({
    investorId: "investorId"
  });

  client.funds.add({
    investorId: "investorId",
    amount: 10,
    transferFrequency: "LOAD_NOW",
    startDate: "2015-01-27T00:00:00.000-0800",
    endDate: "2015-01-27T00:00:00.000-0800"
  })

  client.notes({
    investorId: "investorId"
  });

  client.detailednotes({
    investorId: "investorId"
  });

  client.portfolios.get({
    investorId: "investorId"
  });

  client.portfolios.create({

  })
