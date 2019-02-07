//@flow
import './App.css'
import React, { Component } from 'react'
import { Main } from './containers/Main'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'
import { createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

/* exports */
const store = configureStore()
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#13547A',
    },
    secondary: {
      main: '#fff',
    },
  },
});

class App extends Component {

  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }))
  }

  
  

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


export default App
