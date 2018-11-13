//@flow
import blockstack from 'blockstack'
import _ from 'lodash'
import ethUtils from 'ethereumjs-util'
import IDDao from '/imports/IDDao.js'
import Web3 from 'web3'
// $FlowFixMe
import Web3PromieEvent from 'web3-core-promievent'
import WebsocketProvider from 'web3-providers-ws'

const CREATE_RANDOM_WALLET = true;
const Events = {
  CREATE_ACCOUNT_FAILED:"Account Creation Failed"
}
const Attestations = {
  ACCOUNT_CREATED: "Account Created"
}

export type Attestation = $Values<typeof Attestations>;
export type Event = $Values<typeof Events>;
export type UserData = {
  appPrivateKey:string,
  username:string,
  profile:any,
  authResponseToken:string,
  identityAddress:string,
  decentralizedID:string
}

export type Entity = {
  "@did":string,
  publicKey:string,
}
export type Claim = {
  issuer: Entity,
  subject: Entity,
  sig?:string,
  claim: any,
  issuedAt: Date,
  expiresAt?: Date,
}

export type Identity = {
  name: String,
  language: String,
  socials:[String]
}
export type Profile = {
  address: string,
  identity: Identity
}
export class Blockstack {
  userData:UserData
  profile:Profile
  iddao:IDDao
  static Events = Events
  static Attestations = Attestations
  constructor() {
    //$FlowFixMe
    this.userData = {}
  }
  initFakeWindow() {
    const localStorageRAM = {};

    global.window = {
      location: {
        origin: 'localhost',
        search: ""
      },
      localStorage: {
        getItem: function(itemName) {

          let res = localStorageRAM[itemName] || null;
          console.log({itemName,res})
          return res
        },
        setItem: function(itemName, itemValue) {
          console.log({itemName,itemValue})
          localStorageRAM[itemName] = itemValue;
        },
        removeItem: function(itemName) {
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
  async setUserData(ud:UserData) {
    this.initFakeWindow()
    localStorage.setItem('blockstack',JSON.stringify(ud))
    Object.defineProperties(blockstack, {loadUserData:() => ud})
    this.userData = ud
    global.window.location.search = `?authResponse=${ud.authResponseToken}`
    // await blockstack.getOrSetLocalGaiaHubConnection()
  }
  async getProfile(username?:string) {
    if(!this.profile && this.isLoggedIn())
      this.profile = await blockstack.getFile("profile.js",{username,app:Meteor.absoluteUrl("/"),decrypt:false}).then(file => file? JSON.parse(file):{}).catch(e => {return {}})
    return this.profile || {}
  }
  getUserEthAddr() {
    const appPrivateKey = this.userData.appPrivateKey
    const privateKey = new Buffer(appPrivateKey, 'hex')
    const address = '0x' + ethUtils.privateToAddress(privateKey).toString('hex')
    return address
  }
  init() {
    let loginPromise
    if(blockstack.isUserSignedIn()) loginPromise = Promise.resolve({})
    else if(blockstack.isSignInPending()) {
        loginPromise = blockstack.handlePendingSignIn()
    } else return Promise.resolve({})
    return loginPromise.then(async () => {
      console.log("login in")
      this.userData = blockstack.loadUserData()

        let web3 = new Web3(new WebsocketProvider(Meteor.settings.public.web3provider))
        let account = web3.eth.accounts.create();
        console.log(account)


      let profile = await this.getProfile()
      if(_.get(profile,'address')==undefined)
      {
        profile.address = this.getUserEthAddr()
        // profile.address = account.address
        await Meteor.call('loadWallet',profile.address)

        let res = await blockstack.putFile("profile.js",JSON.stringify(profile),{encrypt:false})
      }
      this.iddao = new IDDao(this.getUserEthAddr(),'0x'+this.userData.appPrivateKey)
      // this.iddao = new IDDao(account.address,account.privateKey)
      return this.userData
    })

  }
  logout() {
    blockstack.signUserOut()
  }
  isLoggedIn() {
    return blockstack.isUserSignedIn()
  }


  async writeIdentityDetails(data:Identity,fee:number) {
    try {
      let profile = await this.getProfile()
      profile.identity = data
      let dataHash = this.iddao.web3.utils.sha3(JSON.stringify(data))


      let profilePath = await blockstack.putFile("profile.js",JSON.stringify(profile),{encrypt:false})
      let ipfsData = {
        address:this.iddao.addr,
        hash: dataHash,
        path:profilePath
      }

      console.log("Wrote profile to blockstack",{profilePath})
      let res = await this.iddao.register(ipfsData,fee)
      console.log('wrote identity',{res})

    } catch (e) {
        console.log(e)
    } finally {

    }
  }

  async reloadProfile() {
    let profile = await blockstack.lookupProfile(this.userData.username)
    this.userData.profile = profile
    if(window.localStorage)
      window.localStorage.setItem('blockstack',JSON.stringify(this.userData))
  }

  getProfile() {
    return _.get(this.userData,'profile')
  }

  async getProposals() {
    return this.iddao.proposalsPromise.then(proposals => {
      let proposalsList = _.toPairs(proposals)
      //read the profile from blockstack
      let proposalPromises =  proposalsList.map(async ([address,proposal]) => {
        console.log("getting blockstack profile",{address,proposal})
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
export default new Blockstack()
