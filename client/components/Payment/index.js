import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Typography, IconButton, Grid, Toolbar, Avatar, Input, InputAdornment } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';



class Payment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const candidate = this.props.candidate
        
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
                        <IconButton color="inherit" aria-label="Menu" onClick={()=>this.props.returnFromPayment()}>
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

                        <Grid item>
                            <Typography variant='h4'>
                                How much Eth <br />
                                Are you willing to Vouch
                    </Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                placeholder='0.3'
                                //value={this.state.weight}
                                //onChange={this.handleChange('weight')}
                                endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
                            />
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

    return {}
}

const connectedPayment = connect(mapStateToProps)(withRouter(Payment));
export { connectedPayment as Payment };