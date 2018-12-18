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
import { promisifyTxHash } from '/imports/web3utils.js'
import IdentityContract from '/imports/blockchain/build/contracts/Identity.json'
import GenesisContract from '/imports/blockchain/build/contracts/GenesisProtocol.json'
import GENContract from '/imports/blockchain/build/contracts/DAOToken.json'
import Utils from './Utils'
import ethUtils from 'ethereumjs-util'
import IPFS from 'ipfs-mini'
import bs58 from 'bs58'


const CONTRACTS_DISABLED = false
export default class IDDao {

  web3: Web3;
  gasPrice: number
  pkey: string
  addr: string
  walletOwnerPubKey: Buffer
  netword_id: number


  constructor(pkey: string) {

if (Meteor.isClient) {
  console.log("%c Client mode", 'background: #222; color: #bada55')
}else{
  console.log("%c Server mode", 'background: blue; color: white')
}

    // $FlowFixMe
    console.log('creating IDao instance for pkey:',pkey)
    this.pkey = pkey
    this.web3 = Utils.getWeb3()
    console.log('generating public key from private key ',this.pkey)
    this.walletOwnerPubKey = ethUtils.privateToPublic(ethUtils.toBuffer('0x' + this.pkey)).toString('hex')
    this.walletOwnerAddress = '0x'+ethUtils.privateToAddress(ethUtils.toBuffer('0x' + this.pkey)).toString('hex')
    this.walletOwnerAccount = this.web3.eth.accounts.privateKeyToAccount(pkey)
    console.log('generated public key ',this.walletOwnerPubKey)
    console.log('generated address ',this.walletOwnerAddress)
    console.log('generated account ',this.walletOwnerAccount.address)
    
    this.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    //this.web3 = new Web3(new WebsocketProvider(Meteor.settings.public.web3provider)) // can be - "wss://ropsten.infura.io/ws" or "ws://localhost:8545" or any other.
    

    //this.web3.eth.accounts.wallet.add(this.walletOwnerAccount)
    this.web3.eth.accounts.wallet.add(this.pkey) // using pKey because using external provider, (Infura in your case), when you specify web3.eth.defaultAccount you must add its private key in web3.eth.accounts.wallet (also referred to as a keystore), https://ethereum.stackexchange.com/questions/26999/invalid-json-rpc-response-error-for-sendtransaction-on-infura-ropsten-node-t
    console.log('adding pkey,walletOwner', { pkey, "walletOwner":this.walletOwnerPubKey })
    console.log('wallet entry for',  this.walletOwnerAccount.address,"' is ",this.web3.eth.accounts.wallet[this.walletOwnerAccount.address])
    
    this.web3.eth.defaultAccount = this.walletOwnerAddress
    console.log('setting defaultAccount to:',this.walletOwnerAddress)
    this.netword_id = Meteor.settings.public.network_id
    console.log({ "network_id": this.netword_id })

    console.log("Identity contract address:",IdentityContract.networks[this.netword_id].address)
    console.log("Genesis contract address:",GenesisContract.networks[this.netword_id].address)
    console.log("GENContract contract address:",GENContract.networks[this.netword_id].address)

    this.gasPrice = 2400000000
    this.gasLimit = 2000000

    this.identityContract = new this.web3.eth.Contract(IdentityContract.abi, IdentityContract.networks[this.netword_id].address, {  gas: this.gasLimit })
    this.genesisContract = new this.web3.eth.Contract(GenesisContract.abi, GenesisContract.networks[this.netword_id].address, { from: this.walletOwnerAddress, gas: this.gasLimit })
    this.GENContract = new this.web3.eth.Contract(GENContract.abi, GENContract.networks[this.netword_id].address, { from: this.walletOwnerAddress, gas: 4500000 })
    
    //this.web3.eth.getGasPrice().then(x=> this.gasPrice = x)
    

    this.listenProposals2 = this.listenProposals2.bind(this)
    this.addEventToAllProposals = this.addEventToAllProposals.bind(this)
    this.handleProposals = this.handleProposals.bind(this)
    this.profileProcessed = this.profileProcessed.bind(this)


    if (Meteor.isClient) {
      this.identityStatus = this.getIdentityStatus(this.walletOwnerAddress).then(x=>{this.identityStatus=x; console.log("this.identityStatus", this.identityStatus)})
      this.proposals = {}
      this.proposalPromise = undefined
      this.allProposalsLoaded = false
      this.amountOfProposals = 0
      this.amountOfProcessedProposals = 0
    }
  }


  /*
      Create new user wallet and top it with some eth and gen
   */
  async createAndTopWallet(toAddr) {
    // let gas = await this.web3.eth.estimateGas({to:toAddr, from:this.walletOwner, value:this.web3.utils.toWei("0.1", "ether")})
    let gas = 300000
    let gasPrice = (await this.gasPrice)

    // Top wallet with 0.1 ethers from this contract (GoodDollar) -> starting amount of the new wallet.
    console.log("sending 0.1 ether to create wallet in address ", toAddr, ' from ',this.walletOwnerAddress)
    let rawTransaction = {
          "from": this.walletOwnerAddress,
          "to": toAddr,
          "value": this.web3.utils.toHex(this.web3.utils.toWei("0.1", "ether")),
          gas,
          "chainId": parseInt(this.netword_id)
        };

    console.log("signing transaction")
     await  this.walletOwnerAccount.signTransaction(rawTransaction).then(signedTx =>{
        console.log("tx signed, tx:",signedTx)
        this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        }).catch(err => {console.error("sendTransaction", err)})
      
    
    //let txHash = await this.web3.eth.sendTransaction({ to: toAddr, value: this.web3.utils.toWei("0.1", "ether") }).catch(err => {console.error("sendTransaction", err)})
    // gas = await this.GENContract.methods.transfer(addr,this.web3.utils.toWei("100", "ether")).estimateGas()

    // Sending 100 ether to Genesis contract from this wallet.
    console.log("Sending 100 MEWE's to account ", toAddr)
    let genTxHash = await this.GENContract.methods.transfer(toAddr, this.web3.utils.toWei("100", "ether")).send().catch(err => {
      console.error("genTransfer", err)
      throw (err)
    })

    console.log("loaded wallet", toAddr)
    return true;
  }
  // Return bytes32 hex string from base58 encoded ipfs hash,
  // stripping leading 2 bytes from 34 byte IPFS hash
  // Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
  // E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
  // "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"

  getBytes32FromIpfsHash(ipfsListing) {
    return "0x" + bs58.decode(ipfsListing).slice(2).toString('hex')
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
  async register(ipfsData, feeAmount): Promise<[typeof Web3PromieEvent]> {
    let dataBuffer = Buffer.from(JSON.stringify(ipfsData))

    // 1. Hash the user data
    let ipfsPromise = new Promise((resolve, reject) => {
      this.ipfs.addJSON(ipfsData, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    }
    )

    // 2. Convert the hashed ips data to Byte32
    let ipfsByte32 = await ipfsPromise.then(hash => this.getBytes32FromIpfsHash(hash))
    console.log({ ipfsByte32 })

    let amount = this.web3.utils.toWei(feeAmount.toString(), "ether");
    let gas = 400000//await this.identityContract.methods.proposeProfile(ipfsByte32).estimateGas({from:this.walletOwner})
    let gasPrice = (await this.gasPrice) * 1.5
    console.log({ gas, gasPrice, amount })

    /* 3. Send TX: identity.propse for this ipfsProfile. This will:
          a. Raise (log) event on the blockchain with this IPFS profile which is now considered a proposal (helpful in the future to load all proposals)
          b. Insert proposal to Daostack mechanism in order to support Daostack feature.
    */
    let balance = await this.web3.eth.getBalance(this.web3.eth.defaultAccount)
    console.log("balance for account.",this.walletOwnerAddress,balance)
    console.log({amount})
    if (balance > 0) {
      let txHash = await this.identityContract.methods.proposeProfile(ipfsByte32).send({
        from:this.web3.eth.defaultAccount,
        gasPrice,
        gas,
        value: amount
      }
      ).catch(err => {
          console.error(err)
          return;
      }
      )
      console.log("Registered profile to DAO", txHash)
      return txHash
    }

  }

  async vouch(proposalId, genAmount) {
    console.log("gencontract vouch call", proposalId, genAmount)
    // let gas = await this.GENContract.methods.approve(GenesisContract.address,genAmount).estimateGas()
    // let gasPrice = await this.gasPrice
    // console.log({gas,gasPrice,genAmount})
    let txApprovePromise: Web3PromieEvent = await this.GENContract.methods.approve(GenesisContract.address, genAmount).send()
    console.log("gencontract vouch after approved", txApprovePromise)
    //gas = await this.genesisContract.methods.stake(proposalId,1,genAmount).estimateGas()
    //gasPrice = (await this.gasPrice)*1.5
    let txPromise: Web3PromieEvent = await this.genesisContract.methods.stake(proposalId, 1, genAmount).send()
    console.log("vouch, after stake", { txPromise })
    return txPromise
  }

  async getProposalProfileIPFS(ipfsByte32) {

    let ipfsHash = this.getIpfsHashFromBytes32(ipfsByte32)
    console.log("getting ipfs file for:", ipfsByte32, ipfsHash)
    return new Promise((reject, resolve) => {
      this.ipfs.catJSON(ipfsHash, (err, result) => {
        console.log("got ipfs response for:", ipfsByte32, ipfsHash, err, result)
        if (err) {
          console.log("error ipfs", err)
          reject(err)
        }
        else {

          resolve(result)
        }
      });
    }).catch(e => e)
  }

  profileProcessed() {

    this.amountOfProcessedProposals++
    console.log(this.amountOfProcessedProposals)
    if (this.amountOfProcessedProposals == this.amountOfProposals) {
      this.allProposalsLoaded = true
      console.log("all proposals loaded", this.proposals)
    }
  }

  listenProposals2() {

    return this.identityContract.getPastEvents('ProfileProposal', {
      fromBlock: Meteor.settings.public.proposalFirstBlock,
      toBlock: 'latest'
    }, this.handleProposals)

  }


  handleProposals(error, events) {

    this.amountOfProposals = events.length
    this.amountOfProcessedProposals = 0

    if (this.amountOfProposals == this.amountOfProcessedProposals) { // no need to load proposals.
      this.allProposalsLoaded = true
      return;
    }

    if (error)
      console.error(error)
    else {
      console.log("profile proposals", events) // same results as the optional callback above
      //events.forEach(e => this.addEventToAllProposals(e))


      // 1. Will wait till *all* events are mapped to their profile - and get an array of profiles
      // 2. Wait for all profiles to complete this action: For each profile, wait again to get extended profile information, and save if on the "this.proposals" object
      // 3. When all completed, return this.proposals when it's fully fulled.
      Promise.all(events.map(e => this.identityContract.methods.profiles(e.returnValues._address).call()
        .then(p => {
          this.addEventToAllProposals(p, e.returnValues._address)
        })))

    }
  }

  addEventToAllProposals(profile, _address) {

    console.log("Adding Profile if has state On Vote", { profile }, this)

    // Checking profile state - only profiles of state 3 and up on GENESIS will be processed
    if (profile.state == "1") // TODO: change "1" to static const members
    {

      let proposalStatusPromise = this.genesisContract.methods.state(profile.proposalId).call()
      let proposalStatusPromiseHandler = (s => {
        let proposalStatus = parseInt(s)
        if (proposalStatus <= 2) {
          this.profileProcessed() // No other processing was done
          console.log("Closed proposal fitltered", { profile, proposalStatus })
          return
        }
      })

      let proposalInfoPromise = this.genesisContract.methods.proposals(profile.proposalId).call()
      let profileDataPromise = this.getProposalProfileIPFS(profile.identityHash)

      Promise.all([proposalStatusPromise, proposalInfoPromise, profileDataPromise]).then(
        (function (values) {
          profile.proposalStatus = values[0]
          profile.proposalInfo = values[1]
          profile.data = values[2]
          this.proposals[_address] = profile // Now IDao on the client contains the full profile information - and the client can use it
          let proposalStatus = profile.proposalStatus
          console.log("Inserted Profile + Proposal", { profile, proposalStatus })
          this.profileProcessed()
        }).bind(this)
      )

    } else {
      this.profileProcessed() // No other processing was done
    }
  }

  async listenProposals() {
    if (CONTRACTS_DISABLED)
      return
    let startBlock = Meteor.settings.public.proposalFirstBlock
    let subscribed = this.identityContract.events.ProfileProposal({
      fromBlock: 9323973,
      toBlock: 'latest'
    }, (error, event) => { console.log("ProfileProposal event:", event); })
      .on('data', async (event) => {
        console.log("ProfileProposal event:", event); // same results as the optional callback above
        this.addEventToAllProposals(event)
      })
    console.log("registered to proposalevent", subscribed)
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
    if (CONTRACTS_DISABLED)
      return 'none'
    let profile = await this.identityContract.methods.profiles(addr).call()
    if (profile.state == 3)
      return 'approved'
    let proposalStatus = await this.genesisContract.methods.state(profile.proposalId).call()
    if (proposalStatus == 3)
      return 'pending vouch'
    if (proposalStatus == 4)
      return 'pending vote'
    return 'none'
  }



}
