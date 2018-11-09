import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.actions.requestData();
    }

    render() {
      
        return (
            <span>
            </span>
        )
    }
}



function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

const connectedUser = connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
export { connectedUser as User};
