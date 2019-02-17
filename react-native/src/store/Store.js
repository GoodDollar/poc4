
//@flow
import type { Effects, Store } from 'undux'
import { createConnectedStore } from 'undux'

type State = {|
  foo: number,
  bar: string[]
|}

let initialState: State = {
  foo: 12,
  bar: []
}

export default createConnectedStore(initialState)

export type StoreProps = {|
  store: Store<State>
|}

export type StoreEffects = Effects<State>
