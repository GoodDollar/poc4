//@flow
import _ from 'lodash'
import IDDao from '/imports/IDDao.js'
export class Daostack {
    iddao:IDDao

  constructor() {
  }

  init(addr,pkey){
    this.iddao = new IDDao(addr,pkey)
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

export default new Daostack() // Singleton
