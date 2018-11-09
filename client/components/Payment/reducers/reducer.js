import { DATA_SUCCESS } from '../actions'
import { DATA_FAILURE } from '../actions'
import { DATA_REQUEST } from '../actions'
import { CANDIDATE_REAL_SUCCESS } from '../actions'
import { CANDIDATE_FAKE_SUCCESS } from '../actions'


const initialState = {
    goBack: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CANDIDATE_REAL_SUCCESS:
            return {
                ...state, goBack: true
            }

        case CANDIDATE_FAKE_SUCCESS:
            return {
                ...state, goBack: true
            }

      
        default:
            return state
    }
}






