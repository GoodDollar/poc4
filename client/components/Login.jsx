import React from 'react'
import Web3 from 'web3'
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import blockstack from 'blockstack'
import Blockstack from '/imports/Blockstack.js'
const styles = {
  loginButton: {
    width:'300px',
    margin:'10px'
  },
  headline: {textAlign: "center", fontSize: "42px", fontStyle: "italic", marginTop: "20%", color:"#323b73"},
  subheader: {textAlign: "center", fontSize: "30px", marginTop: "10%",marginBottom:'10%'},
  loginheader: {textAlign: "center", fontSize: "20px",fontWeight:'bold'},
}

export default class Login extends React.Component {
  constructor(props) {
    super(props)

  }

  //listen to new user event
  initListeners() {

  }
  componentWillUpdate() {
  }
  loginBlockstack() {
    blockstack.redirectToSignInWithAuthRequest(blockstack.makeAuthRequest(blockstack.generateAndStoreTransitKey(),`${window.location.origin}/`,`${window.location.origin}/gdmanifest.json`,['store_write', 'publish_data']),'https://browser.blockstack.org/auth')
    // blockstack.redirectToSignIn()

  }
  render() {
    let LoginDiv
    if (blockstack.isUserSignedIn()) {
        LoginDiv =  <Redirect to='/'/>
      } else if (blockstack.isSignInPending()) {
        blockstack.handlePendingSignIn().then(function(userData) {
          this.setState({loggedin:true})
        })
        LoginDiv = <Button type="submit"  style={styles.loginButton}>Loggining In....</Button>
      }
      else
        LoginDiv = <Button type="submit"  style={styles.loginButton} onClick={() => this.loginBlockstack()}>Login with Blockstack</Button>
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div className="--titan " style={{textAlign:'center'}}>
          <div style={styles.headline} className="--titan ">ImHu</div>
          <div style={styles.subheader}>Unique Humans That Matter</div>
        </div>
        <div style={styles.loginheader}>Prove you are human:</div>
        <div>
        {LoginDiv}
        </div>
      </div>
    )
  }


}
