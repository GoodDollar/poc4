//@flow
import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import * as Actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-native-paper'


class Welcome extends React.Component {
 
    render() {
        const registered = this.props.registered


        return (
            <View>

                <img src="/mewe-logo.png" className="logoImage" alt="" />
                <h1 variant="h6"  className="heroTitle">IDENTITY MADE FOR YOU</h1>
                <img src="/hero-image.png" className="heroImage"  alt="" />
                <br />
                <Button>Vouch and earn</Button>
                <br />
                {(registered === "true") &&
                    <Button >Vote</Button>
                }

                    {(registered === "false") &&
                    <Button >Register</Button>
                }

            </View>
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
