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

class Voter extends React.Component {
    constructor(props) {
        super(props);
        this.Real = this.Real.bind(this);
        this.Fake = this.Fake.bind(this);
        this.updateSelectedCandidate = this.updateSelectedCandidate.bind(this);
        
        this.state = {
            selectedCandidate:undefined,
        }
    }


    componentDidMount() {
        this.props.actions.requestCandidatesData();
    }

    Real(candidate){
        this.props.actions.real(candidate.proposalId)
        }

    Fake(candidate){
        this.props.actions.fake(candidate.proposalId)
   }

    updateSelectedCandidate(candidate){
        this.setState({"selectedCandidate":candidate})
    }

    render() {
        const candidatesList = this.props.candidates
        const candidate = this.state.selectedCandidate || this.props.candidates[0];
        return (
            <div>
                <div>Vote</div>
                <CandidatesSelector isOpen={false} isVoter={true} candidates={candidatesList} slideHandler={this.updateSelectedCandidate} />
                <Grid container spacing={24}>

                    <Grid item xs={6} sm={3}>

                        <Button variant="extendedFab" aria-label="Delete" onClick={()=>this.Real(candidate)}>
                            <Icon />
                            Real
                        </Button>

                    </Grid>
                    <Grid item xs={6} sm={3}>

                        <Button variant="extendedFab" aria-label="Delete" onClick={()=>this.Fake(candidate)}>
                            <Icon />
                            Fake
                          </Button>

                    </Grid>
                </Grid>
            </div>
        )
    }
}

Voter.propTypes = {
    registered: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        candidates: state.voucher.candidates,
        user:state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedVoter = connect(mapStateToProps, mapDispatchToProps)(withRouter(Voter));
export { connectedVoter as Voter };
