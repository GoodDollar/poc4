// @flow
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import Blockstack from './shared/Blockstack'
import { Main } from './containers/Main/index'
import configureStore from './store/configureStore'
import { StyleSheet, View, Platform} from 'react-native'
import { BrowserRouter as Router } from 'react-router-dom'

type Props = {
};


const store = configureStore()
// let blockstack = new Blockstack();

let init = async ()=> {
// 1. Try to login to blockstack.
 // let loginObject = await blockstack.getLoginStatusAndAction() 
 // console.log({loginObject})
}

init();

class App extends Component<Props> {
  
  
  componentDidMount() {
    
  } 


  render() {


    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Router>
              <Main />
            </Router>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);
