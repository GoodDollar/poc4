import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Daostack from '../../shared/Daostack'
import { withRouter } from 'react-router-dom'
import { PageContainer } from '../PageContainer/index'
//import { ProgressBar, Colors } from 'react-native-paper';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.checkProposalsLoaded = this.checkProposalsLoaded.bind(this)
      this.state = {
        proposalsLoaded : false  
      }
  }   

  checkProposalsLoaded(){
      if (Daostack.iddao){
        console.log("Daostack.isAllProposalsLoaded?",Daostack.isAllProposalsLoaded())
        if (Daostack.isAllProposalsLoaded()){
          console.log("setting state.proposalsLoaded=true")
          this.setState({proposalsLoaded:true},window.clearTimeout(this.task))
        }
      }
  }

  componentDidMount(){
    this.task = setInterval(()=>this.checkProposalsLoaded(), 5000);
  }

  componentWillMount(){
    clearTimeout(this.task)
  }

  render() {
    return (
      this.state.proposalsLoaded && <PageContainer />
      /*
      (!this.state.proposalsLoaded &&   <ProgressBar progress={0.5} color={Colors.red800} />)
      ||
      (this.state.proposalsLoaded && <PageContainer />)
    */
    )

  }
}

Main.propTypes = {
  isAllProposalsLoaded: PropTypes.bool,
};

function mapStateToProps(state) {
  return {}
}

const connectedMain = connect(mapStateToProps)(withRouter(Main));
export { connectedMain as Main };
