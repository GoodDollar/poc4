import IDDao from '/imports/IDDao'
import { Mongo } from 'meteor/mongo'
import Secrets from '../Secrets.json'

const network_id = Meteor.settings.public.network_id
console.log("network_id:",network_id)
let owner_address = Meteor.settings.public.identity.owner_address
let owner_pkey = Secrets.ethereum[network_id].identity.owner_pkey
console.log({owner_address, owner_pkey})
const iddaoAdmin = new IDDao(owner_pkey) // using idDao Admin on the server side in the name of us - the creators - using a specific address&pKey to create idDao instance and do actions in the name of it.
const Wallets = new Mongo.Collection("wallets") // keep our record of which address got initial money.
//
Meteor.methods({
  /*
  ** Creating walltet to a new user and transferring intial money to it, from the GoodDollar creators.
  ** Existing address should not get initial money - Wallets.insert will throw exception and break
  */
  async 'loadWallet'(addr) {
    console.log("Trying to load wallet for address:", addr)

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

      return walltedCreated
    }
    catch (e) {
      console.log(e.message)
      return false;
    }
  }
})
