import React, { Component } from 'react';

import Main from './containers/Main';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Provider, connect } from 'react-redux';
import { createStore, compose } from 'redux';
import configureStore from './store/configureStore'
import './App.css';

const store = configureStore()

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  render() {
    return (

      <MuiThemeProvider theme={theme}>
        <Provider store={store}>

          <div className="App">
            <Router>
              <Main />
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
