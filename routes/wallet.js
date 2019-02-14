var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/load', function(req, res, next) {
	console.log("loadWallet request")
	let addr = req.body
  console.log("Trying to load wallet for address:", addr)
	/*
    if (Wallets.findOne(addr)) { // we will not create a registration record in GoodDollar
      console.log('wallet exists')
      return true;
    }

		try {

      console.log('wallet does not exists. creating new wallet for address and topping it')

      let walltedCreated = await iddaoAdmin.createAndTopWallet(addr)
      console.log("walltedCreated?",walltedCreated)
      if (walltedCreated)
       Wallets.insert({ _id: addr }) // will throw exception if the wallet exists

      res.json(walltedCreated)
    }
    catch (e) {
      console.log(e.message)
      return false;
		}*/

});

module.exports = router;
