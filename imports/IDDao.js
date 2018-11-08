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
import IdentityContract from '/ABI/Identity.json'
import GenesisContract from '/ABI/GenesisProtocol.json'
import GENContract from '/ABI/GENProtocol.json'

import ethUtils from 'ethereumjs-util'
import IPFS from 'ipfs-mini'
import bs58 from 'bs58'



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
    this.publicKey = ethUtils.privateToPublic(ethUtils.toBuffer(pkey))
    this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    this.web3 = new Web3(new WebsocketProvider(Meteor.settings.public.infurawss))
    this.web3.eth.accounts.wallet.add(pkey)
    this.web3.eth.defaultAccount = addr
    this.identityContract = new this.web3.eth.Contract(IdentityContract.abi,IdentityContract.networks[this.netword_id],{from:addr})
    this.genesisContract = new this.web3.eth.Contract(GenesisContract.abi,GenesisContract.networks[this.netword_id],{from:addr})
    this.GENContract = new this.web3.eth.Contract(GENContract.abi,GENContract.networks[this.netword_id],{from:addr})
    
    this.netword_id = Meteor.settings.public.network_id // ropsten network
    this.gasPrice = this.web3.eth.getGasPrice()
    this.identityStatus = this.getIdentityStatus(addr)
    this.proposals = {}
    listenProposals()
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
    let amount = this.web3.utils.toWei(feeAmount.toString(), "ether");
    let gas = (await this.identityContract.methods.proposeProfile(ipfsByte32).estimateGas({value:amount}))
      let gasPrice = (await this.gasPrice)*1.5
      console.log({gas,gasPrice,amount})
    let txPromise:Web3PromieEvent = this.identityContract.methods.proposeProfile(ipfsByte32).send({
        gasPrice,
        gas,
        value: amount
    })
    return Promise.resolve("123")
    
  }

  async vouch(proposalId,genAmount) {
    let gas = await this.GENContract.methods.approve(GenesisContract.address,genAmount).estimateGas()
    let gasPrice = (await this.gasPrice)*1.5
    console.log({gas,gasPrice,amount})
    let txApprovePromise:Web3PromieEvent = this.GENContract.methods.approve(GenesisContract.address,genAmount).send({
        gasPrice,
        gas
    })
    await txApprovePromise
    let gas = await this.genesisContract.methods.stake(proposalId,1,genAmount).estimateGas()
    let gasPrice = (await this.gasPrice)*1.5
    console.log({gas,gasPrice,amount})
    let txPromise:Web3PromieEvent = this.genesisContract.methods.stake(proposalId,1,genAmount).send({
        gasPrice,
        gas
    })
    return txPromise
  }

  async getProposalProfileIPFS(ipfsByte32) {
    
    let ipfsHash = getIpfsHashFromBytes32(ipfsByte32)
    console.log("getting ipfs file for:",ipfsByte32,ipfsHash)
    return new Promise((reject,resolve) => {
      this.ipfs.catJSON(ipfsHash, (err, result) => {
        console.log("got ipfs response for:",ipfsByte32,ipfsHash,err,result)
        if(err) reject(err)
        else resolve(result)
      });
    })
  }
  async listenProposals() {
    let startBlock = 9322796  
    this.identityContract.events.ProfileProposal({
      fromBlock: startBlock
    }, (error, event) => { console.log(event); })
    .on('data', async (event) => {
      console.log(event); // same results as the optional callback above
      let {_address} = event.returnValues
      let profile = this.identityContract.methods.profiles(_address).call()
      console.log("Adding Profile if has status 1",{profile})
      if(profile.status==1)
      {
        let proposalStatus = await this.genesisContract.methods.status(profile.proposalId).call()
        if(proposalStatus<=2)
        {
          console.log("Closed proposal fitltered",profile)
          return
        }
        let proposalInfo = await this.genesisContract.methods.proposals(profile.proposalId).call()
        let profileData = await this.getProposalProfileIPFS(profile.identityHash)
        profile.proposalInfo = proposalInfo
        profile.proposalStatus = proposalStatus
        profile.data = profileData
        console.log("Inserted Profile+Proposal",profile)
        this.profiles[proposal._address] = profile
      }
    })

    this.identityContract.events.ProfileApproved({
      fromBlock: startBlock
    }, (error, event) => { console.log(event); })
    .on('data', async (event) => {
      console.log(event); // same results as the optional callback above
      let {_address} = event.returnValues
      delete this.profiles[_address]
      
    })
    this.identityContract.events.ProfileDeclined({
      fromBlock: startBlock
    }, (error, event) => { console.log(event); })
    .on('data', async (event) => {
      console.log(event); // same results as the optional callback above
      let {_address} = event.returnValues
      delete this.profiles[_address]
      
    })


  }

  async getIdentityStatus(addr) {
    let profile = await this.identityContract.methods.profiles(addr).call()
    if(profile.state==3)
      return 'approved'
    let proposalStatus = await this.genesisContract.methods.stats(profile.proposalId).call() 
    if(proposalStatus==3)
      return 'pending vouch'
    if(proposalStatus==4)
      return 'pending vote'
    return 'none'
  }  


  
}
