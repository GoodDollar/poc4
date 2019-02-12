//@flow
import React from 'react'
import PropTypes from 'prop-types'
import * as Actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'

class Welcome extends React.Component {
 
    render() {
        const registered = this.props.registered


        return (
            <div>

                <img src="/mewe-logo.png" className="logoImage" alt="" />
                <h1 variant="h6"  className="heroTitle">IDENTITY MADE FOR YOU</h1>
                <img src="/hero-image.png" className="heroImage"  alt="" />
                <br />
                <Button variant="contained" color="secondary" className="heroVouchButton">Vouch and earn</Button>
                <br />
                {(registered === "true") &&
                    <Button variant="contained" color="primary">Vote</Button>
                }

                    {(registered === "false") &&
                    <Button variant="contained" color="primary">Register</Button>
                }

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
