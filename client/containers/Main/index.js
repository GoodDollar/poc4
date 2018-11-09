import React from 'react';

import { Route, Link, Redirect, Switch } from 'react-router-dom'
import { Welcome } from '../../components/Welcome'
import { OneOfUs } from '../../components/OneOfUs'
import { Voucher } from '../../components/Voucher'
import  Socialset  from '../../components/Socialset';
import  { User }  from '../../components/shared/User';
import { Payment } from '../../components/Payment';
import { Voter } from '../../components/Voter';
import { Stats } from '../../components/Stats';



export default function Main() {
  return (
    <div>
  <User />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/oneOfUs" component={OneOfUs} />
        <Route exact path="/register" component={Welcome} />
        <Route exact path="/socialset" component={Socialset} />
        <Route exact path="/voucher" component={Voucher} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/voter" component={Voter} />
        <Route exact path="/stats" component={Stats} />



    </div>
  );
}

