/* @flow */

// $FlowFixMe
import blockstack from 'blockstack'
// $FlowFixMe
import _ from 'lodash'
// $FlowFixMe
import Web3 from 'web3'
// $FlowFixMe
import Web3PromieEvent from 'web3-core-promievent'
import WebsocketProvider from 'web3-providers-ws'
import {promisifyTxHash} from '/imports/web3utils.js'
import IdentityContract from '/imports/blockchain/build/contracts/Identity.json'
import GenesisContract from '/imports/blockchain/build/contracts/GenesisProtocol.json'
import GENContract from '/imports/blockchain/build/contracts/StandardToken.json'
import ethUtils from 'ethereumjs-util'
import IPFS from 'ipfs-mini'
import bs58 from 'bs58'


const CONTRACTS_DISABLED = false
export default class IDDao {

  web3:Web3;
  gasPrice:number
  pkey:string
  addr:string
  publicKey:Buffer
  netword_id:number


  constructor(addr:string,pkey:string) {

    // $FlowFixMe

    this.addr = addr
    this.pkey = pkey
    this.publicKey = ethUtils.privateToPublic(ethUtils.toBuffer('0x'+pkey))
    this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    this.web3 = new Web3(new WebsocketProvider(Meteor.settings.public.web3provider)) // can be - "wss://ropsten.infura.io/ws" or "ws://localhost:8545" or any other.

    this.web3.eth.accounts.wallet.add(pkey)
    this.web3.eth.defaultAccount = addr
    this.netword_id = Meteor.settings.public.network_id 
    console.log("this.netword_id",this.netword_id)
    console.log(IdentityContract.networks[this.netword_id].address)
    this.identityContract = new this.web3.eth.Contract(IdentityContract.abi,IdentityContract.networks[this.netword_id].address,{from:addr,gas:2000000})
    this.genesisContract = new this.web3.eth.Contract(GenesisContract.abi,GenesisContract.networks[this.netword_id].address,{from:addr,gas:2000000})
    this.GENContract = new this.web3.eth.Contract(GENContract.abi,GENContract.networks[this.netword_id].address,{from:addr,gas:4500000})

    
    this.gasPrice = this.web3.eth.getGasPrice()
    if(Meteor.isClient)
    {
      this.identityStatus = this.getIdentityStatus(addr)
      this.proposals = {}
      //start listening to proposal events
      this.proposalsPromise = this.listenProposals2()
    }
  }


/*
    Create new user wallet and top it with some eth and gen
 */
async createAndTopWallet(addr) {
  // let gas = await this.web3.eth.estimateGas({to:addr, from:this.addr, value:this.web3.utils.toWei("0.1", "ether")})
  let gas = 300000
  // let gasPrice = (await this.gasPrice)

  // Top wallet with 0.1 ethers from this contract (GoodDollar) -> starting amount of the new wallet.
  let txHash = await this.web3.eth.sendTransaction({gas,to:addr, from:this.addr, value:this.web3.utils.toWei("0.1", "ether")})
  // gas = await this.GENContract.methods.transfer(addr,this.web3.utils.toWei("100", "ether")).estimateGas()

  // Sending 100 ether to Genesis contract from this wallet.
  let genTxHash = await this.GENContract.methods.transfer(addr, this.web3.utils.toWei("100", "ether")).send()
  console.log("loaded wallet",addr)
}
// Return bytes32 hex string from base58 encoded ipfs hash,
// stripping leading 2 bytes from 34 byte IPFS hash
// Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
// E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
// "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"

getBytes32FromIpfsHash(ipfsListing) {
  return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
}

// Return base58 encoded ipfs hash from bytes32 hex string,
// E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

getIpfsHashFromBytes32(bytes32Hex) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

  /*
    write profile to identity dao and pay fee
  */
  async register(ipfsData,feeAmount):Promise<[typeof Web3PromieEvent]> {
    let dataBuffer = Buffer.from(JSON.stringify(ipfsData))
    let ipfsPromise = new Promise((resolve,reject) => {
      this.ipfs.addJSON(ipfsData,(err,result) => {
        if(err) reject(err)
        else resolve(result)
      })
    }


    )
    let ipfsByte32 = await ipfsPromise.then(hash => this.getBytes32FromIpfsHash(hash))
    console.log({ipfsByte32})

    let amount= this.web3.utils.toWei(feeAmount.toString(), "ether");
    let gas = 400000//await this.identityContract.methods.proposeProfile(ipfsByte32).estimateGas({from:this.addr})
    let gasPrice = (await this.gasPrice)*1.5
    console.log({gas,gasPrice,amount})
    let txHash = this.identityContract.methods.proposeProfile(ipfsByte32).send({
      gasPrice,
      gas,
      value: amount
    })
    console.log("Registered profile to DAO",txHash)
    return txHash

  }

  async vouch(proposalId,genAmount) {
    console.log("gencontract vouch call",proposalId,genAmount)
    // let gas = await this.GENContract.methods.approve(GenesisContract.address,genAmount).estimateGas()
    // let gasPrice = await this.gasPrice
    // console.log({gas,gasPrice,genAmount})
    let txApprovePromise:Web3PromieEvent = await this.GENContract.methods.approve(GenesisContract.address,genAmount).send()
    console.log("gencontract vouch after approved",txApprovePromise)
    //gas = await this.genesisContract.methods.stake(proposalId,1,genAmount).estimateGas()
    //gasPrice = (await this.gasPrice)*1.5
    let txPromise:Web3PromieEvent = await this.genesisContract.methods.stake(proposalId,1,genAmount).send()
    console.log("vouch, after stake",{txPromise})
    return txPromise
  }

  async getProposalProfileIPFS(ipfsByte32) {

    let ipfsHash = this.getIpfsHashFromBytes32(ipfsByte32)
    console.log("getting ipfs file for:",ipfsByte32,ipfsHash)
    return new Promise((reject,resolve) => {
      this.ipfs.catJSON(ipfsHash, (err, result) => {
        console.log("got ipfs response for:",ipfsByte32,ipfsHash,err,result)
        if(err) {
          console.log("error ipfs",err)
          reject(err)
        }
        else {

          resolve(result)
        }
      });
    }).catch(e =>  e)
  }
  listenProposals2() {
    return this.identityContract.getPastEvents('ProfileProposal', {
      fromBlock: Meteor.settings.public.proposalFirstBlock,
      toBlock: 'latest'
    }, function(error, events){ console.log(error,events); })
    .then(events => {
        console.log("profileproposals",events) // same results as the optional callback above
        events.forEach(e => this.handleProposalEvent(e))
        return this.proposals
    });
  }
  async handleProposalEvent(event) {
    let {_address} = event.returnValues
    let profile = await this.identityContract.methods.profiles(_address).call()
    console.log("Adding Profile if has status 1",{profile},this)
    if(profile.state=="1")
    {
      let proposalStatus = await this.genesisContract.methods.state(profile.proposalId).call().then(s => parseInt(s))

      if(proposalStatus<=2)
      {
        console.log("Closed proposal fitltered",{profile,proposalStatus})
        return
      }
      let proposalInfo = await this.genesisContract.methods.proposals(profile.proposalId).call()
      let profileData = await this.getProposalProfileIPFS(profile.identityHash)
      profile.proposalInfo = proposalInfo
      profile.proposalStatus = proposalStatus
      profile.data = profileData
      console.log("Inserted Profile+Proposal",{profile,proposalStatus})
      this.proposals[_address] = profile
    }
  }
  async listenProposals() {
    if(CONTRACTS_DISABLED)
      return
    let startBlock =  Meteor.settings.public.proposalFirstBlock
    let subscribed = this.identityContract.events.ProfileProposal({
      fromBlock: 9323973,
      toBlock: 'latest'
    }, (error, event) => { console.log("ProfileProposal event:",event); })
    .on('data', async (event) => {
      console.log("ProfileProposal event:",event); // same results as the optional callback above
      this.handleProposalEvent(event)
    })
    console.log("registered to proposalevent",subscribed)
    // this.identityContract.events.ProfileApproved({
    //   fromBlock: startBlock
    // }, (error, event) => { console.log(event); })
    // .on('data', async (event) => {
    //   console.log(event); // same results as the optional callback above
    //   let {_address} = event.returnValues
    //   delete this.profiles[_address]
    //
    // })
    // this.identityContract.events.ProfileDeclined({
    //   fromBlock: startBlock
    // }, (error, event) => { console.log(event); })
    // .on('data', async (event) => {
    //   console.log(event); // same results as the optional callback above
    //   let {_address} = event.returnValues
    //   delete this.profiles[_address]
    //
    // })


  }

  async getIdentityStatus(addr) {
    if(CONTRACTS_DISABLED)
      return 'none'
    let profile = await this.identityContract.methods.profiles(addr).call()
    if(profile.state==3)
      return 'approved'
    let proposalStatus = await this.genesisContract.methods.state(profile.proposalId).call()
    if(proposalStatus==3)
      return 'pending vouch'
    if(proposalStatus==4)
      return 'pending vote'
    return 'none'
  }



}
