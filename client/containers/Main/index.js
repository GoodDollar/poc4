import React from 'react';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
// import Welcome from '../../components/Welcome'
// import Register from '../../components/Register'
import Login from '/client/containers/Login'
export default function Main() {
  return (
    <div>

        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/register" component={Register} /> */}



    </div>
  );
}
