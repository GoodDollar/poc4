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


class Welcome extends React.Component {
    constructor(props) {
        super(props);
       
    }


    render() {
        const registered = this.props.registered


        return (
            <div>

                <img src="" alt="" />
                <h2>IDENTITY MADE FOR YOU</h2>
                <h3>What would you like to do today?</h3>
                <Grid container>
                    <Grid item md={4}>
                        <span />
                    </Grid>
                    <Grid item md={2}>
                        <Button variant="contained" color="primary">Predict</Button>
                    </Grid>
                    <Grid item md={2}>
                        {(registered == "true") &&
                            <Button variant="contained" color="primary">Vote</Button>
                        }

                         {(registered == "false") &&
                            <Button variant="contained" color="primary">Register</Button>
                        }

                        
                    </Grid>
                    <Grid item md={4}>
                        <span />
                    </Grid>
                </Grid>


            </div>
        )
    }
}

Welcome.propTypes = {
    registered: PropTypes.string,
};

function mapStateToProps(state) {

    return {
     
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedWelcome = connect(mapStateToProps, mapDispatchToProps)(withRouter(Welcome));
export { connectedWelcome as Welcome};
