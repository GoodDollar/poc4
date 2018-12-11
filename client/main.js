import ReactDOM from 'react-dom';
import React from 'react'
import Blockstack from '/imports/Blockstack.js'
import Daostack from '/imports/Daostack.js'
import DebugHelper from '/imports/DebugHelper.js'
import App from './App'
import ethUtils from 'ethereumjs-util'
import '/imports/startup/client';
import '/imports/startup/both';

Meteor.startup(async (f) => {
  let blockstack = new Blockstack();

  // 1. Try to login to blockstack.
  let loginObject = await blockstack.getLoginStatusAndAction() 

  if (loginObject.loggedState == Blockstack.LOGGED_STATE.NOT_LOGGED_IN) {
      this.props.history.push('login');
  } else {
    if (loginObject.loggedState == Blockstack.LOGGED_STATE.LOGGED_IN) {

      loginObject.loginPromise.then(() => {
                
        let iddao = Daostack.init(blockstack.getUserPrivateKey())

        if (Meteor.settings.public.isDebug){  
          /* TODO: 
          1. Change to check if in debug following the --debug flag? check here: https://stackoverflow.com/questions/6889470/how-to-programmatically-detect-debug-mode-in-nodejs/13454643
          2. Use preprocessor directive, something like @ifdebug.
          */
          console.debug("debug mode")
          // For debug purposes
          DebugHelper.init();
          DebugHelper.mockProposals();
        }

      
      //2. load and listen proposal events to display to this user
      if (Meteor.isClient)
         proposalsLoaded = Daostack.listenProposals() // TODO: retrun errors here
         console.log("proposalsLoaded?",proposalsLoaded)
      })
      .catch((e) => console.log("Not logged in:", e))
    }
    window.Blockstack = blockstack
    window.Daostack = Daostack
    window.ethUtils = ethUtils

    const profile = await blockstack.getProfile()
    console.log({ profile })
    ReactDOM.render(
      <App />,
      document.getElementById('app') 
    );
  }
});