// @flow
import logo from './logo.png';
import { Provider } from 'react-redux'
import { Main } from './containers/Main/index'
import React, { Component } from 'react'
import configureStore from './store/configureStore'
import { BrowserRouter as Router } from 'react-router-dom'
import { StyleSheet,Text, View, Platform, TouchableHighlight, Animated, Easing,} from 'react-native';


const store = configureStore()

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    console.log("users")
    fetch('/users').then(res => res.json())
    .then(users => this.setState({ users }))
      
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
