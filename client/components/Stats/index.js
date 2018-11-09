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
import StackedItems from '../shared/StackedItems'

class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.requestData()
    }


    render() {

        const { ethEarnd, gains, reputation, pending, past } = this.props.stats

        return (

            <div>
                <Grid container spacing={24}>

                    <Grid item xs={6} sm={3}>
                        {ethEarnd}
                    </Grid>
                    <Grid item xs={6} sm={3}>

                        {gains}


                    </Grid>
                    {reputation}
                </Grid>
                <StackedItems items={pending} />

            </div>
        )
    }
}

Stats.propTypes = {
};

function mapStateToProps(state) {
    return {
        stats: state.stats.userData,
        user: state.user,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedStats = connect(mapStateToProps, mapDispatchToProps)(withRouter(Stats));
export { connectedStats as Stats };
