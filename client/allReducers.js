
import { combineReducers } from 'redux'
import welcome from  './components/Welcome/reducers/reducer'
import voucher from  './components/Voucher/reducers/reducer'
import user from  './components/shared/User/reducers/reducer'
import stats from  './components/Stats/reducers/reducer'


const allReducers = combineReducers({
    welcome,
    voucher,
    user,
    stats
  
})

export default allReducers


