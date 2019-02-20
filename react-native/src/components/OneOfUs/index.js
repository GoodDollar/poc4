// @flow
import React from 'react';
import { Button } from 'react-native'
import Store from '../../store/Store'
import Blockstack from '../../shared/Blockstack'
import type { StoreProps } from '../../store/Store'
import { View, Image, StyleSheet } from 'react-native'

type Props = {
    //history: string,     
};


const createId = async () => {
    //await this.blockstackIns.writeIdentityDetails({}, 0.0001); // add proposal //TODO:
}

const goToVoucher = () => {
   //this.props.history.push('voucher');
}


class OneOfUs extends React.Component<Props> {

    constructor() {
        super();
        console.log('OneOfUs loaded')
      
    }
  
    render() {
        return (
                <View>
                     <Button onPress={goToVoucher} title='Vouch and earn'>Vouch and earn</Button>
                     <Button onPress={createId} title='Create id'>Create id</Button>

                </View>
        )
    }
  }

export default OneOfUs;

