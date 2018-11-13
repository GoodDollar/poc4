import ReactDOM from 'react-dom';
import React from 'react'
import Blockstack from '/imports/Blockstack.js'
import App from './App'
import ethUtils from 'ethereumjs-util'

import '/imports/startup/client';
import '/imports/startup/both';

Meteor.startup( async (f) => {
  await Blockstack.init()
    .then(res => {
      const appPrivateKey = res.appPrivateKey
      const privateKey = new Buffer(appPrivateKey, 'hex')
      const address = '0x' + ethUtils.privateToAddress(privateKey).toString('hex')

      console.log("called Blockstack.init",res,address, ethUtils.privateToAddress(privateKey).toString(),ethUtils.privateToPublic(privateKey).toString())
    })
    .catch((e) => console.log("Not logged in:",e))
  window.Blockstack = Blockstack  
  const profile = await Blockstack.getProfile()
  console.log({profile})
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
} );