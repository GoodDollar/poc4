//@flow
import _ from 'lodash'
import Secrets from '/Secrets.json'
const Web3 = require("web3") // import web3 v1.0 constructor

export class Utils {
    web3:Object

  constructor() {
      this.init()
  }

  init(){
      //this.web3 = window.web3; // depracated
      this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
        console.log("Web3.givenProvider",Web3.givenProvider);
        if (!Web3.givenProvider)
            console.log("ws://localhost:8546")
  }

  getWeb3(){
    
    let web3Provider = undefined
    let useWebSocket = Meteor.settings.public.useWebSocket
    if ((typeof this.web3 !== 'undefined') && (this.parseVersionString(this.web3.version.api).major > 0 )){  // web3 version 1.0 and up
      web3Provider = this.web3.currentProvider;
      console.log("existing web3. is is metamask?",web3.currentProvider.isMetaMask);
  } else {

    let network_id = Meteor.settings.public.network_id
    
    let provider;
    if (useWebSocket){
        provider = Meteor.settings.public.websocketWeb3Provider + Secrets.ethereum[network_id].infura.api_key
        web3Provider = new Web3.providers.WebsocketProvider(provider);
    }else{
        provider = Meteor.settings.public.httpWeb3provider + Secrets.ethereum[network_id].infura.api_key
        web3Provider = new Web3.providers.HttpProvider(provider);
    }
    console.log("new web3 from provider:"+provider);
   }

  // use globally injected web3 to find the currentProvider and wrap with web3 v1.0
   this.web3 = new Web3(web3Provider);


    //console.log("web3 provider:",this.web3.currentProvider.constructor.name)
    console.log("web3 version:",this.web3.version.api || this.web3.version)

    return this.web3
  }

  parseVersionString(str){
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}
}




export default new Utils() // Singleton
