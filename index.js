var bitcore =require('bitcore-lib');
var explorers = require('bitcore-explorers');
const insight = new explorers.Insight();

insight.getUnspentUtxos("1Je7B8kSuqKNHPo1SNF39fvpgaXzo6isKL", function(error, utxos) {
  console.log(utxos);
});