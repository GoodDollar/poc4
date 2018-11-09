import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'


class Register extends React.Component {
    constructor(props) {
        super(props);

    }
    

    render() {

        return (

           <div></div>

        )
    }
}

Register.propTypes = {
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

const connectedRegister = connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
export { connectedRegister as Register};

