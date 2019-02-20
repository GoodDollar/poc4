//@flow
import _ from 'lodash'
import bs58 from 'bs58'
import IPFS from 'ipfs-mini'
//import blockstack from 'blockstack'
import ethUtils from 'ethereumjs-util'
//import Utils from '/imports/Utils.js
import { Accounts } from 'web3-eth-accounts'
import stripHexPrefix from 'strip-hex-prefix'
//import WebsocketProvider from 'web3-providers-ws'
//import Web3PromieEvent from 'web3-core-promievent'
//import {promisifyTxHash} from '/imports/web3utils.js'
import Web3 from 'web3' // import web3 v1.0 constructor

export class Mock {
    //iddao: IDDao

    constructor() {
        this.web3 = new Web3(Web3.givenProvider)
        this.accountsUtils = new Accounts(this.web3.currentProvider)
      /*  this.BlockstackUsersData = []
        this.web3 = Utils.getWeb3()
        */
       

        
    }

    init() {

    }

    getBytes32FromIpfsHash(ipfsListing) {
         return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
    }
/*
    async register(ipfsData,feeAmount):Promise<[typeof Web3PromieEvent]> {
            let dataBuffer = Buffer.from(JSON.stringify(ipfsData))
            let ipfsPromise = new Promise((resolve,reject) => {
            this.iddao.ipfs.addJSON(ipfsData,(err,result) => {
                if(err) reject(err)
                else resolve(result)
            })
            }


            )
            let ipfsByte32 = await ipfsPromise.then(hash => this.getBytes32FromIpfsHash(hash))
            console.log({ipfsByte32})

            let amount= this.web3.utils.toWei(feeAmount.toString(), "ether");
            let gas = 400000//await this.identityContract.methods.proposeProfile(ipfsByte32).estimateGas({from:this.addr})
            let gasPrice = (await this.iddao.gasPrice)*1.5
            console.log({gas,gasPrice,amount})
            console.log("proposing from:",ipfsData.address.address)
            let txHash = this.iddao.identityContract.methods.proposeProfile(ipfsByte32).send({
                from:ipfsData.address.address,
                gasPrice,
                gas,
                value: amount
            })

            txHash.then(res=>{
                console.log("Registered profile to DAO",res)
            }).catch(err=>{
                console.error(err)
            })
            
            return txHash

    }*/


    mockProposals = async () => {


        let fee = 0.1
        
        let proposals = []
        for (let i = 0; i < 4; i++) {
            let account = this.accountsUtils.create();
            console.log("mocking proposal "+i)
            //let iddao = Daostack.init(stripHexPrefix(account.privateKey))
            //this.iddao = iddao
    
             //let walletLoadedOnServer =  await Meteor.call('loadWallet', account.address)
            let username = "generated.id.blockstack" + i
            let firstname = "firstname"+i 
            let lastname = "lastname" +i
            //let profilePath = await blockstack.putFile("profile"+i+".js", JSON.stringify(username), { encrypt: false })
            let profilePath = "profile"+i+".js"

            //let ethOffering = 10*(10^(i*-1)),
            let ethOffering = 0.056
            let contentUrl = "http://www.cds.caltech.edu/~macmardg/Photos/NZ/images/img00"+i+".jpg"
            let facebook = "https://www.facebook.com/person"+i+"/"
            let twitter = "https://twitter.com/person"+i+"/"
            let linkedin = "https://www.linkedin.com/person"+i+"/"
            let instagram = "https://www.instagram.com/person"+i+"/"
            let github = "https://github.com/person"+i+"/"
            let data =
            {
                    ethOffering,
                    appPrivateKey: account.privateKey,
                    authResponseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiIzOGMyZTUyZC1iYmYyLTQ5MzAtODdkZi01MmFkMGEyMTQ2MTAiLCJpYXQiOjE1NDI1MzIzODIsImV4cCI6MTU0NTEyNDM4MiwiaXNzIjoiZGlkOmJ0Yy1hZGRyOjFGUWlXU1pqWkhFMWtxbTRRRHA4ZTFYdmhBYnlQWFUyaHIiLCJwcml2YXRlX2tleSI6IjdiMjI2OTc2MjIzYTIyMzkzMzYzMzUzNDMxMzY2NjM3MzczNTM5MzEzODY2NjYzMTYzMzMzMzM5NjQzMjYzMzUzMjMwMzIzNTYyMzQ2MzIyMmMyMjY1NzA2ODY1NmQ2NTcyNjE2YzUwNGIyMjNhMjIzMDMyNjEzNDM3NjQzODM2MzgzMzY2MzE2NjY1NjIzMDM2NjY2MzYzMzUzNDYxNjU2MTY2MzMzNjY0MzYzMTMwMzczMDMyNjIzODMzMzE2MTMzMzMzMDY2NjIzNzMzMzc2NjMzMzYzNzMzMzczMDM3MzczMzM0NjI2NTYyNjE2NjY0MzQyMjJjMjI2MzY5NzA2ODY1NzI1NDY1Nzg3NDIyM2EyMjMxMzI2NDY0MzA2MzMzNjU2NTM2MzczOTMwMzc2MTMzMzkzODY2NjE2NTMxNjMzMzMzMzIzNDM1MzM2NDM0MzkzOTY0NjE2NjM2MzYzMzMyMzc2NDMwMzIzNjM0MzQ2NjMyMzgzMDM0MzUzMTY0NjM2NDYyMzMzODYxMzA2MTYzNjYzNjM1MzczODM4MzY2MTMxNjI2MzMzMzIzNzM2NjEzMTM2MzU2NDY1NjYzNjM0NjQzODY1MzgzMDY1MzEzOTY1MzgzMzMyMzMzMjMxNjIzOTYyMzg2MjM4MzEzMzMwMzQzNDYxNjQzOTM1MzQzMzMxMzUzNDMwNjYzMjM4NjYzNDM5MzczOTM3MzczNzMxMzk2NjM1MzIzODY2MzQ2NDMxMzAzNTMwMzYzMDM1MzQzOTM1MzAzMzY0NjYzODY2MjIyYzIyNmQ2MTYzMjIzYTIyMzUzMDM0Mzc2NDMyNjM2NDY1MzQ2NDYzMzI2NTMzMzI2MzM0NjM2NDY1NjIzNTY2NjIzMTMzMzk2MjY0NjQ2MjYzMzc2MTM2NjQzODYyMzIzMzM4MzczOTMzMzczNzYzNjI2NDMyMzc2MjYzMzk2NDM0MzEzOTY0MzIzNTMyMzUyMjJjMjI3NzYxNzM1Mzc0NzI2OTZlNjcyMjNhNzQ3Mjc1NjU3ZCIsInB1YmxpY19rZXlzIjpbIjAyMGJlYjM3NGMxMjA1YjYyYTBkYjFmODY1N2UyNmFkZWJjNDdiM2VlNjE1NjQ4MTljYjRlNWZhNjA4ODE2YjA4ZiJdLCJwcm9maWxlIjpudWxsLCJ1c2VybmFtZSI6ImhhZGFyYm1kZXYzLmlkLmJsb2Nrc3RhY2siLCJjb3JlX3Rva2VuIjpudWxsLCJlbWFpbCI6bnVsbCwicHJvZmlsZV91cmwiOiJodHRwczovL2dhaWEuYmxvY2tzdGFjay5vcmcvaHViLzFGUWlXU1pqWkhFMWtxbTRRRHA4ZTFYdmhBYnlQWFUyaHIvcHJvZmlsZS5qc29uIiwiaHViVXJsIjoiaHR0cHM6Ly9odWIuYmxvY2tzdGFjay5vcmciLCJ2ZXJzaW9uIjoiMS4yLjAifQ.-x79zyAxPvtyYYfIhh-oy256B-vdmiU-iuDCexlW3MQBxSpRbXmGk3-L1X7P6WfhY7iG3kzmV0EoW4smV76I1w",
                    coreSessionToken: null,
                    decentralizedID: "did:btc-addr:1FQiWSZjZHE1kqm4QDp8e1XvhAbyPXU2hr",
                    hubUrl: "https://hub.blockstack.org",
                    identityAddress: "1FQiWSZjZHE1kqm4QDp8e1XvhAbyPXU2hr",
                    image:[{
                        contentUrl,
                    }],
                    profile: {
                        type: "Person",
                        context: "http://schema.org",
                        apps: {
                            http: "https://gaia.blockstack.org/hub/15x6kscLKQpwhRrfJqwUrjh5SmDnGoiTrN/"
                        }
                    },
                    username,
                    firstname,
                    lastname,
                     socialMedia:{
                        facebook,
                        twitter,
                        linkedin,
                        instagram,
                        github,
         }
                     
        
                
            }

            let dataHash = this.web3.utils.sha3(JSON.stringify(data))
            proposals.push(data)



            let ipfsData = {
                address: account,
                hash: dataHash,
                path: profilePath
            }

            
            //let res = await this.register(ipfsData, fee)
            //let res = await this.iddao.register(ipfsData, fee)
            // console.log('wrote identity to dao', { res })
            return proposals
        }
    }
}

export default new Mock()
