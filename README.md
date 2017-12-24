******SMART PROPERTY******
The concept here is to transfer BTC from BUYER to SELLER, there will be two transactions. One transaction of BTC from Buyer to Seller, other is transfer of BTC from property to other property.
The flow is like this, the buyer inputs its address from which it needs to give money(fromAddress) to which address it needs to give (sellerAddress). Then the signs the transaction with its private key (private key for Buyer Address)
Note the transaction is still not broadcasted at this time(not sent to to the network.)

(A)After this the seller needs to sign the transaction with the private key of its property. Behind the scene this private key is used to get the address of the property and then new random private key is generated and its corresponding address. So the original property address and new property address is used to create property transaction. and then this new property address private key is given to the new owner. 
So in general following two trasactions take place. 
1) buyer address to seller address
2) original property address to new property address.

Now whenever the seller needs to use its property to open it, it will use only the private key. One the client side the seller private key is used to sign a message and send the message to send to the server and on the server side the address of the property together with the message is used to validate that this message is from correct owner. 


//The code below is used to transfer of money from Buyer to Seller.
//var bitcore = require('bitcore-lib');
var explorers = require('bitcore-explorers');
var Promise = require('bluebird');
var bitcore = require('./node_modules/bitcore-explorers/node_modules/bitcore-lib')
const insight = new explorers.Insight();
var bitcoinaddress = require('bitcoin-address');
var transaction = {
"fromaddress":"1Je7B8kSuqKNHPo1SNF39fvpgaXzo6isKL",
"toaddress":"18TDtMz1XLs4tUn98qsXGiCgd4pJsYetv1",
"privatekey":"L4D99rTim8BZzAbRoUUsRkdcaGLFk8f9WBiq9amL2pAJVnitv2bz"
}


var createTransaction = function(transaction) {
  return new Promise((resolve, reject) => {

   const unit = bitcore.Unit;
const minerFee = unit.fromMilis(0.128).toSatoshis(); //cost of transaction in satoshis (minerfee)
const transactionAmount = unit.fromMilis(0.05).toSatoshis();

    if (!bitcoinaddress.validate(transaction.fromaddress)) {
      return reject('Origin address checksum failed');
    }
    if (!bitcoinaddress.validate(transaction.toaddress)) {
      return reject('Recipient address checksum failed');
    }

    insight.getUnspentUtxos(transaction.fromaddress, function(error, utxos) {
      if (error) {
        //any other error
        return reject(error);
      } else {

        if (utxos.length == 0) {
          //if no transactions have happened, there is no balance on the address.
          return reject("You don't have enough Satoshis to cover the miner fee.");
        }

        //get balance
        var balance = unit.fromSatoshis(0).toSatoshis();
        for (var i = 0; i < utxos.length; i++) {
          balance += unit.fromSatoshis(parseInt(utxos[i]['satoshis'])).toSatoshis();
        }

        //check whether the balance of the address covers the miner fee
        if ((balance - transactionAmount - minerFee) > 0) {

          //create a new transaction
          try {
            var bitcore_transaction = new bitcore.Transaction()
              .from(utxos)
              .to(transaction.toaddress, transactionAmount)
              .fee(minerFee)
              .change(transaction.fromaddress)
              .sign(transaction.privatekey);

            //handle serialization errors
            if (bitcore_transaction.getSerializationError()) {
              var error = bitcore_transaction.getSerializationError().message;
              switch (error) {
                case 'Some inputs have not been fully signed':
                  return reject('Please check your private key');
                  break;
                default:
                  return reject(error);
              }
            }

            // broadcast the transaction to the blockchain
            insight.broadcast(bitcore_transaction, function(error, body) {
              if (error) {
                reject('Error in broadcast: ' + error);
              } else {
                resolve({
                  transactionId: body
                });
              }
            });

          } catch (error) {
            return reject(error.message);
          }
        } else {
          return reject("You don't have enough Satoshis to cover the miner fee.");
        }
      }
    });
  });
}

createTransaction(transaction).then(function(res){
console.log(res);
})

*/

Point (A) code is var 
ownerKey = new bitcore.PrivateKey(private key input which belongs to the owner of the property, which the seller use to sign as mentioned in A);
console.log(ownerKey.toAddress());  // to get the property address.


// This code is used to generate the random key and its corresponding address at which the propoerty will be transfered to.
var newOwnerKey = new bitcore.PrivateKey.fromRandom(bitcore.Networks.livenet)  // this key will be given to the owner
console.log(newOwnerKey);
console.log(newOwnerKey.toAddress());

So both these transactions take place together buyer to seller, old property to new property. This is all about transactions.


Now comes the part if seller wants to view its property or access it. for that from client side seller enters its private key as input and that key is used to sign a message.

var message = require('bitcore-message');
var signature = message('Bought').sign(new bitcore.PrivateKey(private key input from prooperty owner));
This signature is send to server side then.

console.log(message('Bought').verify(address of the property,signature)); //here at server side using the addres of the property the message is verified. 
At server side the address of the property since it keeps changing because fo buying and selling so it keeps need to get updated before the signature is verified.
Following method is used to updaet the address of the property.
var inputAddr = "1Je7B8kSuqKNHPo1SNF39fvpgaXzo6isKL"

*request('ingisht/api/addr/inoutAddr').then(
{
txId = response
request('insight/api/tx/txid').then({
output = response.outputAddr
if(output == inputAddr)
break everything and come out of loop, inputAddr is final owner
else
inputAddr = output
Loop back to *
})

}
var inputAddr = "1Je7B8kSuqKNHPo1SNF39fvpgaXzo6isKL"

*request('ingisht/api/addr/inoutAddr').then(
{
txId = response
request('insight/api/tx/txid').then({
output = response.outputAddr
if(output == inputAddr)
break everything and come out of loop, inputAddr is final owner
else
inputAddr = output
Loop back to *
})

}

Starts with the address. 
Make an API call to /api/addr to get the transactions and then use the TXid to make another API call to /api/tx to get the input and output address of transactions.
Transactions in which outputaddr is same as address in which the transaction in present break the loop and consider that address as final address of the owner. 
)
