import IDDao from '/imports/IDDao'
import { Mongo } from 'meteor/mongo'
//h
const iddaoAdmin = new IDDao("0x27822d4556d2c6757D1094380eEc98200689932a","0x8B10EB11CB17E56D318F7D54DE24EBF29BB815872B65E61FB8DE69406356EC2D")
const Wallets = new Mongo.Collection("wallets")
//
Meteor.methods({
  async 'loadWallet'(addr) {
      try
      {

        Wallets.insert({_id:addr})
        console.log("Loading wallet",addr)
        return iddaoAdmin.loadWallet(addr)
      }
      catch(e) {
        console.log(e.message)
      }
  }
})
