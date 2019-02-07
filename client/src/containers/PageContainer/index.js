import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Welcome } from '../../components/Welcome'
import { Route, Link, Redirect, Switch } from 'react-router-dom'

class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  
    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Route exact path="/register" component={Welcome} />
          </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(Actions, dispatch)
    };
}

function mapStateToProps(state) {
    return {};
}


const connectedPageContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(PageContainer));
export { connectedPageContainer as PageContainer };


