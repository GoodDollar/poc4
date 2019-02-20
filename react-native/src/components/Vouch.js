// @flow
import _ from 'lodash'
import React from 'react';
import {Mock} from './../test/Mock'
import Store from '../store/Store'
//import {Payment} from '../Payment'
import { View, Image, Button } from 'react-native'
import CandidateSelector from './CandidateSelector'

type State = {
    proposalsLoaded:boolean,
    showPayment:boolean,
    selectedCandidate:any, // TODO: define correctly
}

type Props = {
};



class Voucher extends React.Component<Props, State> {

    state = {
        candidates: [],
        selectedCandidate:{},

      };

    constructor(props:Props) {
        super(props);
        console.log('Vouch Screen loaded')
    }

    getCandidatesData = (proposals) => {
        //let proposals = await Daostack.getProposals()
        let allProposals = proposals.map((proposal,idx) => {
            let photo = _.get(proposal,"profile.image[0].contentUrl","https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-1/45418652_2141102242636679_111588077893320704_n.jpg?_nc_cat=107&_nc_ht=scontent.fhfa1-2.fna&oh=e66ce7906c5bacc8947662a8f1c35be5&oe=5C415570")
            let firstname = _.get(proposal," .name","John Doe")
            // console.log({firstName})
            return {
                id:idx,
                proposalId:proposal.proposalId,
                photo,
                firstname,
                lastname:"",
                ethOffering:0.5334,
                socialMedia:proposal.socialMedia,
                username:proposal.username
              }
          })
          debugger;
        return allProposals
     }

    componentDidMount() {
        let mock = new Mock()
        mock.mockProposals().then(proposals => this.getCandidatesData(proposals))
    }

    Vouche = () => {
        this.setState((state, props) => ({
            showPayment: 'Vouche'
        }));
    }

    Fake = () =>{
        this.setState((state, props) => ({
            showPayment: 'Fake'
        }));

   }

    updateSelectedCandidate = (candidate) =>{
        this.setState((state, props) => ({
            selectedCandidate: 'candidate'
        }));

    }

    returnFromPayment = () =>{
      this.updateSelectedCandidate(undefined)
      this.setState((state, props) => ({
            showPayment: undefined
        }));
    }



    render() {
        console.log("this.state.showPayment="+this.props.showPayment)
        const candidatesList = this.state.candidates
        const candidate = this.state.selectedCandidate || this.props.candidates[0];

        return(
            <View>
                <p className="topHeader">Vouch if profile is real and earn GEN</p>
                <Button title='Vouch' onPress={()=>this.Vouch()}>Vouch</Button>
                <br />
                <Button title='Fake' onPress={()=>this.Fake()}>Fake</Button>
                <CandidateSelector isOpen={true} candidates={candidatesList} slideHandler={this.updateSelectedCandidate} isVoter={false} />
            </View>
        )
        /*
        
        

        const candidate = this.state.selectedCandidate || this.props.candidates[0];
        return (
            
            ((this.state.showPayment=="Vouche")&&(<Payment type="Vouche" candidate={candidate} returnFromPayment={this.returnFromPayment}></Payment>))||
            ((this.state.showPayment=="Fake")&&(<Payment type="Fake" candidate={candidate} returnFromPayment={this.returnFromPayment}></Payment>)) ||



           (this.state.showPayment==undefined) && (<div>
                <p className="topHeader">Vouch if profile is real and earn GEN</p>
                <CandidatesSelector isOpen={true} candidates={candidatesList} slideHandler={this.updateSelectedCandidate} isVoter={false} />

                <div className="innerFlex">
                    <Grid container spacing={0} justify="center">

                        <Grid item xs={6} sm={6}> 

                            <a aria-label="Delete" onClick={()=>this.Fake()} className="roundButton">
                                <img src="./assets/buttonFake.svg" />
                            </a>

                        </Grid>

                        <Grid item xs={6} sm={6}>

                            <a aria-label="Delete" onClick={()=>this.Vouche()} className="roundButton">
                                <img src="./assets/buttonVouch.svg" />
                            </a>

                        </Grid>
                    </Grid>
                </div>
            </div>
            )
            
       )
            */
    }
}


export default Store.withStore(Voucher);