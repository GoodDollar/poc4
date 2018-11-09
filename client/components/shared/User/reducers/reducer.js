import { DATA_SUCCESS } from '../actions'
import { DATA_FAILURE } from '../actions'
import { DATA_REQUEST } from '../actions'

const initialState = {
    user: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DATA_SUCCESS:
            return {
                ...state, user: action.data
            }

        case DATA_FAILURE:
            return {
                ...state, user: []
            }

       
        default:
            return state
    }
}






