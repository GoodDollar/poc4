import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Mewe from './assets/mewe.png'
// import CenterImage from './assets/1_Visual.png'
// import Logo from './assets/GoodDollar_LOGO.png'


class OneOfUs extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.history.push("voucher");
    }
    render() {
        const registered = this.props.registered

        return (
            <div>
                <Grid container style={{ height: '100vh' }}
                >
                    <Grid item xs={12}>
                        <img src="/assets/mewe.png"
                            style={{
                                height: '15vh',
                                width: '15vh',
                                border: '2px solid white',
                                borderRadius: '5px'
                            }}
                        />
                        <h3 style={{ color: 'white' }}>Identity made for you</h3>
                    </Grid>

                    <Grid xs={12}>
                        <img src="/assests/1_Visual.png"
                        style={{height:'40vh'}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container
                            direction={'column'}
                            alignItems={'center'}
                            justify={'space-around'}
                            spacing={8}
                        >
                            <Grid item>
                                <Button variant='contained'
                                    onClick={this.handleClick}
                                    color='primary'
                                >vouch and earn
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button variant='contained' color='secondary' disabled>create id</Button>
                            </Grid>
                            <Grid>
                                <Grid container alignItems={'center'}>
                                    <h5 style={{color:'white'}}>powered by</h5>
                                    <img src="/assets/GoodDollar_LOGO.png"
                                    style={{height:'5vh'}}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

OneOfUs.propTypes = {
    registered: PropTypes.string,
};

function mapStateToProps(state) {

    return {}
}

const connectedOneOfUs = connect(mapStateToProps)(withRouter(OneOfUs));
export { connectedOneOfUs as OneOfUs };
