import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import CandidatesSelector from '../shared/CandidatesSelector'
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import {Payment} from '../Payment'

class Voucher extends React.Component {
    constructor(props) {
        super(props);
        this.Vouche = this.Vouche.bind(this);
        this.Vote = this.Vote.bind(this);
        this.updateSelectedCandidate = this.updateSelectedCandidate.bind(this);
        this.returnFromPayment = this.returnFromPayment.bind(this)
        
        this.state = {
            selectedCandidate:undefined,
            showPayment:undefined
        }
    }

    componentDidMount() {
        this.props.actions.requestCandidatesData();
    }

    Vouche(){
         this.setState({"showPayment":"Vouche"});   
    }

    Vote(){
        this.setState({"showPayment":"Vote"});   
   }

    updateSelectedCandidate(candidate){
        this.setState({"selectedCandidate":candidate})
    }

    returnFromPayment(){
        this.updateSelectedCandidate(undefined)
        this.setState({"showPayment":undefined});   

    }
   
  

    render() {
        console.log("this.state.showPayment="+this.state.showPayment)  
        const candidatesList = this.props.candidates
       
        const candidate = this.state.selectedCandidate || this.props.candidates[0];
        return (

            ((this.state.showPayment=="Vouche")&&(<Payment type="Vouche" candidate={candidate} returnFromPayment={this.returnFromPayment}></Payment>))||    
            ((this.state.showPayment=="Vote")&&(<Payment type="Vote" candidate={candidate} returnFromPayment={this.returnFromPayment}></Payment>)) ||   



           (this.state.showPayment==undefined) && (<div>
                <div>Vouch if profile is real and earn ETH</div>
                <CandidatesSelector isOpen={true} candidates={candidatesList} slideHandler={this.updateSelectedCandidate} isVoter={false} />
                <Grid container spacing={0}>

                    <Grid item xs={6} sm={3}>

                        <Button variant="extendedFab" aria-label="Delete" onClick={()=>this.Vouche()}>
                            <Icon />
                            Vouche
                        </Button>

                    </Grid>
                    <Grid item xs={6} sm={3}>

                        <Button variant="extendedFab" aria-label="Delete" onClick={()=>this.Vote()} >
                            <Icon />
                            Fake
                          </Button>

                    </Grid>
                </Grid>
            </div>)
        )
    }
}

Voucher.propTypes = {
    registered: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        candidates: state.voucher.candidates,
        user:state.user,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedVoucher = connect(mapStateToProps, mapDispatchToProps)(withRouter(Voucher));
export { connectedVoucher as Voucher };
