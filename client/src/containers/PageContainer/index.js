import { Route} from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Welcome } from '../../components/Welcome'
import { OneOfUs } from '../../components/Welcome'

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
                <Route exact path="/oneOfUs" component={OneOfUs} />

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


