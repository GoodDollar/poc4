// @flow
import React from 'react'
import {View, Text} from 'react-native'
import Store from '../../store/Store'
import type { StoreProps } from '../../store/Store'

class MainWork extends React.Component<StoreProps> {

  render() {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    )

  }
}


export default Store.withStore(MainMainWork)


