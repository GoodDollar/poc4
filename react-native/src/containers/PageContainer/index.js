import { connect } from 'react-redux'
import { Route} from 'react-router-dom'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { StyleSheet,Text, View, Platform, TouchableHighlight, Animated, Easing,} from 'react-native'

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
            <View>

          </View>
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


