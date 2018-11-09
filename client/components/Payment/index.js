import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Typography, IconButton, Grid, Toolbar, Avatar, Input, InputAdornment } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import * as Actions from './actions'



class Payment extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.handleChange = this.handleChange.bind(this);
        this.stake = this.stake.bind(this);
        this.state = {
            goBack:false
        }




    }

    stake(){
        this.setState({goBack:false});

        if (this.props.type == "Fake")
            this.props.actions.fake(this.state.payment,this.props.candidate.proposalId,this.props.returnFromPayment);
        else
            this.props.actions.vouche(this.state.payment,this.props.candidate.proposalId,this.props.returnFromPayment);
    }


    handleChange(e) {
        const { id, value } = e.target;

        this.setState({[id]: value});
    }

    render() {


        const candidate = this.props.candidate
        //const operation = this.props.type

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Paper style={{
                    width: '60vh',
                    height: '80vh',
                    marginTop: '2vh'
                }}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={() => this.props.returnFromPayment()}>
                            <ArrowBack />
                        </IconButton>
                    </Toolbar>
                    <Grid
                        container
                        spacing={16}
                        direction="column"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar
                                alt="Adelle Charles"
                                src={candidate.photo}
                                style={{ width: '20vh', height: '20vh' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='caption'>
                                Vouch for {candidate.firstname}
                            </Typography>
                        </Grid>

                        <Grid item>che
                            <Typography variant='subtitle2'>
                                {this.props.type == "Fake" && "You believe the account is fake."}
                                {this.props.type == "Vouche" && "You would like to vouch for this account."}

                                <br/>
                                How much are you willing to stake?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                id='payment'
                                placeholder='0.3'
                                onChange = {this.handleChange}
                                //value={this.state.weight}
                                //onChange={this.handleChange('weight')}
                                endAdornment={<InputAdornment position="end">GEN</InputAdornment>}
                            />
                        </Grid>
                        <Grid item>
                            <Grid container
                                spacing={16}
                                alignContent='space-around'
                                direction='row-reverse'
                            >
                                <Grid item>
                                    <IconButton
                                       onClick={() => this.stake()}
                                        className='far fa-check-circle'
                                        color='primary' />
                                </Grid>

                                <Grid item>
                                    <IconButton onClick={() => this.props.returnFromPayment()} className='far fa-times-circle' color='primary' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

Payment.propTypes = {
    registered: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        payment: state.payment,
        user:state.user,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedPayment = connect(mapStateToProps, mapDispatchToProps)(withRouter(Payment));
export { connectedPayment as Payment };
