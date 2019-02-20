
// @flow
import React from 'react'
import Store from '../store/Store'
import Daostack from '../shared/Daostack'
import PageContainer from './PageContainer'
import type { StoreProps } from '../../store/Store'
import { containsValidProofStatement } from 'blockstack/lib/profiles';
//import { ProgressBar, Colors } from 'react-native-paper';

type State = {
  proposalsLoaded:boolean,
}

class Main extends React.Component<StoreProps,State> {
  
  intervalId:IntervalID
  state = {
    proposalsLoaded: false,
  };
  
  constructor() {
    super()
    console.log('Main loaded')
  }   

   checkProposalsLoaded:()=>void  =() => {
      this.setState({proposalsLoaded:true},window.clearTimeout(this.intervalId)) // TEMP
      /*if (Daostack.iddao){
        console.log("Daostack.isAllProposalsLoaded?",Daostack.isAllProposalsLoaded())
        if (Daostack.isAllProposalsLoaded()){
          console.log("setting state.proposalsLoaded=true")
          this.setState({proposalsLoaded:true},window.clearTimeout(this.task))
        }
      }*/
  }

  componentDidMount(){
    this.intervalId = setInterval(()=> this.checkProposalsLoaded(), 5000);
  }

  componentWillMount(){
    clearInterval(this.intervalId)
  }

  render() {
    return (
      <PageContainer />
       /*this.state.proposalsLoaded && <PageContainer />*/
      /*
      (!this.state.proposalsLoaded &&   <ProgressBar progress={0.5} color={Colors.red800} />)
      ||
      (this.state.proposalsLoaded && <PageContainer />)
    */
    )

  }
}


export default Store.withStore(Main)


