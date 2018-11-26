import React, { Component } from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Welcome } from '../../components/Welcome'
import { OneOfUs } from '../../components/OneOfUs'
import { Voucher } from '../../components/Voucher'
import Socialset from '../../components/Socialset';
import { User } from '../../components/shared/User';
import { Payment } from '../../components/Payment';
import { Voter } from '../../components/Voter';
import { Stats } from '../../components/Stats';
import Login from '../../components/Login'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

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
                PageConteiner
                <User />
                <Route exact path="/" component={OneOfUs} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/oneOfUs" component={OneOfUs} />
                <Route exact path="/register" component={Welcome} />
                <Route exact path="/socialset" component={Socialset} />
                <Route exact path="/voucher" component={Voucher} />
                <Route exact path="/payment" component={Payment} />
                <Route exact path="/voter" component={Voter} />
                <Route exact path="/stats" component={Stats} />
                <Route exact path="/login" component={Login} />
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


