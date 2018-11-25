import React from 'react';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Blockstack from '/imports/Blockstack.js'

class OneOfUs extends React.Component {
    constructor(props) {
        super(props);
        this.goToVoucher = this.goToVoucher.bind(this);
        this.createId = this.createId.bind(this)
        this.blockstackIns = new Blockstack();

    }

    async createId(){
        await this.blockstackIns.writeIdentityDetails({}, 0.0001); // add proposal

    }

    goToVoucher() {
        this.props.history.push('voucher');
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
                        <img src='/assets/mewe.png'
                            style={{
                                height: '15vh',
                                width: '15vh',
                                marginTop:'4vh',
                                border: '2px solid white',
                                borderRadius: '5px'
                            }}
                        />
                        <h1 style={{ color: 'white', fontWeight: '300', textTransform: 'uppercase', fontSize: '20px' }}>Identity made for you</h1>
                    </Grid>

                    <Grid item xs={12}>
                        <img src='/assets/1_Visual.png'
                            style={{
                                height: 'auto',
                                maxWidth:'200px'
                            }}
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
                                <Button style={{ width: '30vh' }}
                                    variant='contained'
                                    onClick={this.goToVoucher}
                                    color='secondary'
                                >Vouch and earn
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button style={{ width: '30vh' }} variant='contained' color='secondary' onClick={this.createId}>Create id</Button>
                            </Grid>
                            <Grid>
                                <Grid container alignItems={'center'}>
                                    <h5 style={{ color: 'white' }}>powered by</h5>
                                    <img src='/assets/GoodDollar_LOGO.png'
                                        style={{ height: '4vh' }}
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
