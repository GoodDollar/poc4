//@flow

/* imports */
import './App.css'
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from './store/configureStore'
import { createMuiTheme } from '@material-ui/core/styles'
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
            <h1>Users</h1>
            {this.state.users.map(user =>
              <div key={user.id}>{user.username}</div>
            )}
          </div>
        </Provider>
    </MuiThemeProvider>


    );
  }
}


export default App
