// @flow
import { View } from 'react-native'
import Store from '../../store/Store'
import { Route} from 'react-router-dom'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Welcome from '../../components/Welcome'
import OneOfUs from '../../components/OneOfUs'
import Voucher from '../../components/Voucher'
import type { StoreProps } from '../../store/Store'



class PageContainer extends Component<StoreProps> {
    constructor() {
        super();
        console.log('PageContainer loaded')
      
    }
  
    componentDidMount(){

    }

    render() {
        return (
            <View>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/register" component={Welcome} />
                <Route exact path="/oneOfUs" component={OneOfUs} />
                <Route exact path="/vouch" component={Voucher} />


          </View>
        );
    }
}


export default Store.withStore(PageContainer)

