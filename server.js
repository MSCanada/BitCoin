//Require bitcore
var bitcore = require('bitcore-node');
//var StampingService = require('./StampingService')
var util = require('util');

//Services
var Bitcoin = bitcore.services.Bitcoin;
var Web = bitcore.services.Web;

var myNode = new bitcore.Node({
  network: 'regtest',
  services: [
    {
      name: 'bitcoind',
      module: Bitcoin,
      config: {
        connect: [{
        rpcuser: 'msuhail',
        rpcpassword: 'cricket',
        "zmqpubrawtx": "tcp://127.0.0.1:8332"
      }]
      }
    },
    {
      name : 'web',
      module : Web,
      config : {
        port : 3001
      }
    }
  ]
});

myNode.start(function() {
  //start the node so the node.on('ready') is actually called. 
  console.log("Node Start");
});

myNode.on('ready', function() {
  console.log('Bitcoin Node Ready');

myNode.services.bitcoind.getInfo(function(err, info) {
  console.log(info)




});

var address = 'mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu';
var options = {
  noTxList: false
};

var address = 'mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu';
var options = {
  queryMempool: false
};
myNode.services.bitcoind.getAddressUnspentOutputs(address, options, function(err, unspentOutputs) {
  //console.log(err);
  console.log(unspentOutputs);
});


Web.prototype.setupRoutes = function(app, express) {
  // Set up routes
  app.get('/hello', function(req, res) {
  //  myNode.services.bitcoind.getBlock('683d114524603c04b791709efd30e19d1149f502b72a6d6fc61d38f9f770a21f', function(err, block) {
  // console.log(block);
  // });

var address = 'mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu';
var options = {
  queryMempool: true
};
myNode.services.bitcoind.getAddressUnspentOutputs(address, options, function(err, unspentOutputs) {
  //console.log(err);
  console.log(unspentOutputs);
});

// var txid = "4088a87acf57ed5c92ca3725b06abb5acf420e75230f26c62e335bb7dd5018c5";
// myNode.services.bitcoind.getDetailedTransaction(txid, function(err, transaction) {
// //console.log(JSON.stringify(transaction));
// });

// var address = "mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu";
// myNode.services.bitcoind.getAddressBalance(address, options, function(err, balance) {
//   // balance will be in satoshis with "received" and "balance"
//  // console.log(balance)
// });

var address = 'mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu';
var options = {
  noTxList: false
};

// myNode.services.bitcoind.getAddressSummary("mqkEkhXEKoGZGAfj25uZm2hnaGoeXu4Ehu", options, function(err, summary) {
//   console.log(err);
//   console.log(summary)
// });


    res.send('world');
  });

  
};

Web.prototype.getRoutePrefix = function() {
  return 'my-service'
};




});

myNode.on('error', function(err) {
  console.error(err);
});



// // shutdown the node
// myNode.stop(function() {
//   // the shutdown is complete
// });
// myNode.services.bitcoind.getAddressBalance('n3wBzHHixmdLaMQ2pk4sPPHfgiEAUmK25e', false, function(err, total) {
//   console.log(total.balance); //Satoshi amount of this address
// });
// myNode.services.bitcoind.on('block', function(blockHash) {
//  console.log("block added");
// });

// myNode.services.bitcoind.getBlock("08a8d0bff38ac79e359771db004bcb2af6ae9059c7e5375df711fe7d8dca8700", function(err, block) {
//   console.log(block);
// });

//myNode.services.bitcoind.getInfo(function(err, info) {
//  console.log(info)
//});


