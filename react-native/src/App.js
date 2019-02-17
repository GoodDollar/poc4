// @flow
import Store from './store/Store'
import React, { Component } from 'react'
import Main from './containers/Main/index'
import Blockstack from './shared/Blockstack'
import { StyleSheet, View, Platform,} from 'react-native'
import { BrowserRouter as Router } from 'react-router-dom'

type Props = {
};


// let blockstack = new Blockstack();

let init = async ()=> {
// 1. Try to login to blockstack.
 // let loginObject = await blockstack.getLoginStatusAndAction() 
 // console.log({loginObject})
}

init();

class App extends Component<{},{}> {
  
  render() {
    return (
        <Store.Container>
          <View>
          <Router>
              <Main />
            </Router>
        </View>
        </Store.Container>
    );
  }
}

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
