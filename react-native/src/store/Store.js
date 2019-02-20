
//@flow
import type { Effects, Store } from 'undux'
import { createConnectedStore } from 'undux'

type State = {|
  registered: boolean,
  proposalsLoaded:boolean,
|}

let initialState: State = {
  registered: false,
  proposalsLoaded: false
  
}

export default createConnectedStore(initialState)

export type StoreProps = {|
  store: Store<State>
|}

export type StoreEffects = Effects<State>
