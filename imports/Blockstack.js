//@flow
import blockstack from 'blockstack'
import _ from 'lodash'
import ethUtils from 'ethereumjs-util'
import IDDao from '/imports/IDDao.js'
import Utils from '/imports/Utils.js'
import Web3 from 'web3'
// $FlowFixMe
import Web3PromieEvent from 'web3-core-promievent'
import WebsocketProvider from 'web3-providers-ws'

const CREATE_RANDOM_WALLET = true;
const LOGGED_STATE = {
  NOT_LOGGED_IN: -1,
  PENDING_LOGIN: 0,
  LOGGED_IN: 1,


}
const Events = {
  CREATE_ACCOUNT_FAILED: "Account Creation Failed"
}
const Attestations = {
  ACCOUNT_CREATED: "Account Created"
}

export type Attestation = $Values<typeof Attestations>;
export type Event = $Values<typeof Events>;
export type UserData = {
  appPrivateKey: string,
  username: string,
  profile: any,
  authResponseToken: string,
  identityAddress: string,
  decentralizedID: string
}

export type Entity = {
  "@did": string,
  publicKey: string,
}
export type Claim = {
  issuer: Entity,
  subject: Entity,
  sig?: string,
  claim: any,
  issuedAt: Date,
  expiresAt?: Date,
}

export type Identity = {
  name: String,
  language: String,
  socials: [String]
}
export type Profile = {
  address: string,
  identity: Identity
}

let instance = null;

export class Blockstack {

  userData: UserData
  profile: Profile
  iddao: IDDao

  static LOGGED_STATE = LOGGED_STATE
  static Events = Events
  static Attestations = Attestations

  constructor() {
    //$FlowFixMe
    if (!instance) {
      instance = this;
    }

    this.userData           = {}
    this.getUserEthAddr     = this.getUserEthAddr.bind(this)
    this.loadLoggedInUser   = this.loadLoggedInUser.bind(this)
    this.getUserPrivateKey  = this.getUserPrivateKey.bind(this)
    
    
  }

  initFakeWindow() {
    const localStorageRAM = {};

    global.window = {
      location: {
        origin: 'localhost',
        search: ""
      },
      localStorage: {
        getItem: function (itemName) {

          let res = localStorageRAM[itemName] || null;
          console.log({ itemName, res })
          return res
        },
        setItem: function (itemName, itemValue) {
          console.log({ itemName, itemValue })
          localStorageRAM[itemName] = itemValue;
        },
        removeItem: function (itemName) {
          delete localStorageRAM[itemName];
        }
      }
    }
    global.location = global.window.location
    global.localStorage = global.window.localStorage
  }
  /**
   * [setUserData for server side, we overwrite the default loadUserData which reads from localStorage]
   * @param {[UserData]} ud [the user data as returned from blockstack login]
   */
  async setUserData(ud: UserData) {
    this.initFakeWindow()
    localStorage.setItem('blockstack', JSON.stringify(ud))
    Object.defineProperties(blockstack, { loadUserData: () => ud })
    this.userData = ud
    global.window.location.search = `?authResponse=${ud.authResponseToken}`
    // await blockstack.getOrSetLocalGaiaHubConnection()
  }

  async getProfile(username?: string) {
    if (!this.profile && this.isLoggedIn())
      this.profile = await blockstack.getFile("profile.js", { username, app: Meteor.absoluteUrl("/"), decrypt: false }).then(file => file ? JSON.parse(file) : {}).catch(e => { return {} })
    return this.profile || {}
  }

  getUserPrivateKey() {
    return this.userData.appPrivateKey
  }
  getUserEthAddr() {
    const appPrivateKey = this.getUserPrivateKey()
    const privateKey = new Buffer(appPrivateKey, 'hex')
    const address = ethUtils.privateToAddress(privateKey).toString('hex')
    return address
  }

  async loadLoggedInUser(){
    console.log("loading logged in user")
    this.userData = blockstack.loadUserData()

    let profile = this.getProfile()
    if (_.get(profile, 'address') == undefined) {
      profile.address = this.getUserEthAddr()
      console.log('profile.address', profile.address)
      
     let walletLoadedOnServer =  await Meteor.call('loadWallet', profile.address)
     console.log("walletLoadedOnServer?",walletLoadedOnServer) // TODO: return server errors if any

      let res = await blockstack.putFile("profile.js", JSON.stringify(profile), { encrypt: false })
    }
    
    console.log("called Blockstack.getLoginStatusAndAction", this.userData, this.getUserEthAddr())
    return this.userData
  }

  getLoginStatusAndAction() {
    let loginObject

    if (blockstack.isSignInPending()) { // Pending signin state
      loginObject = { "loggedState": LOGGED_STATE.PENDING_LOGIN, "loginPromise": blockstack.handlePendingSignIn() }
      return loginObject;
    }

    if (!blockstack.isUserSignedIn()) { // User not logged in.
      loginObject = { "loggedState": LOGGED_STATE.NOT_LOGGED_IN, "loginPromise": Promise.resolve({}) }
      return loginObject;
    }


    // User is logged in.
    loginObject = { "loggedState": LOGGED_STATE.LOGGED_IN, "loginPromise": Promise.resolve({}) }
    loginObject.loginPromise = loginObject.loginPromise.then(this.loadLoggedInUser) // TODO: Loading logged in user from the server is not part of blockstack responsibility

    return loginObject;

  }

  

  

  logout() {
    blockstack.signUserOut()
  }
  isLoggedIn() {
    return blockstack.isUserSignedIn()
  }


  async writeIdentityDetails(data: Identity, fee: number) { // TODO: return promise with ipfsData
    console.log('writeIdentityDetails',Identity,fee)
    
    try {
      let web3 = Utils.getWeb3()
      let account = web3.eth.accounts.create(); // TODO: Do we need to create another eth account?! Or get it from blockstack, if exists?
      console.log('account', account)
      

      let profile = this.getProfile()
      profile.identity = data
      profile.address = account.address
      let dataHash = Web3.utils.sha3(JSON.stringify(data))


      let profilePath = await blockstack.putFile("profile.js", JSON.stringify(profile), { encrypt: false })
      let ipfsData = {
        address: this.iddao.addr,
        hash: dataHash,
        path: profilePath
      }

      console.log("Wrote profile to blockstack", { profilePath })
      let res = await this.iddao.register(ipfsData, fee)
      console.log('wrote identity to dao', { res })

    } catch (e) {
      console.log(e)
    } finally {

    }

  }

  async reloadProfile() {
    let profile = await blockstack.lookupProfile(this.userData.username)
    this.userData.profile = profile
    if (window.localStorage)
      window.localStorage.setItem('blockstack', JSON.stringify(this.userData))
  }

  getProfile() {
    return _.get(this.userData, 'profile')
  }

  async getProposals() {
    return this.iddao.proposalsPromise.then(proposals => {
      let proposalsList = _.toPairs(proposals)
      //read the profile from blockstack
      let proposalPromises = proposalsList.map(async ([address, proposal]) => {
        console.log("getting blockstack profile", { address, proposal })
        let profile = await fetch(proposal.data.path).then(res => res.json())
        proposal.profile = profile
        return proposal
      })
      return Promise.all(proposalPromises)
    })
  }
}

Blockstack.Events = Events
Blockstack.Attestations = Attestations
Blockstack.LOGGED_STATE = LOGGED_STATE
export default Blockstack
