import { service } from '../services';

export const DATA_REQUEST  = 'DATA_REQUEST '
export const DATA_SUCCESS = 'DATA_SUCCESS'
export const DATA_FAILURE = 'DATA_FAILURE'
export const CANDIDATES_DATA_SUCCESS = 'CANDIDATES_DATA_SUCCESS'
export const CANDIDATE_REAL_SUCCESS = 'CANDIDATE_REAL_SUCCESS'
export const CANDIDATE_FAKE_SUCCESS = 'CANDIDATE_FAKE_SUCCESS'


export function requestData() {
    return dispatch => {
        //dispatch(request({ userId }));

        service.getData()
            .then(
                data => {
                    dispatch(success(data));
                    //  history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: DATA_REQUEST } }
    function success(data) { return { type: DATA_SUCCESS, data } }
    function failure(error) { return { type: DATA_FAILURE, error } }
}

export function requestCandidatesData() {
    return dispatch => {
        //dispatch(request({ userId }));

        service.getCandidatesData()
            .then(
                data => {
                    dispatch(success(data));
                    //  history.push('/');
                },
                error => {
                   //dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    //function request() { return { type: DATA_REQUEST } }
    function success(data) { return { type: CANDIDATES_DATA_SUCCESS, data } }
   // function failure(error) { return { type: DATA_FAILURE, error } }
}

export function real(proposalId) {
    return dispatch => {
        //dispatch(request({ userId }));

        service.real(proposalId)
            .then(
                data => {
                    dispatch(success(data));
                    //  history.push('/');
                },
                error => {
                   //dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    //function request() { return { type: DATA_REQUEST } }
    function success(data) { return { type: CANDIDATE_REAL_SUCCESS, data } }
   // function failure(error) { return { type: DATA_FAILURE, error } }
}


export function fake(proposalId) {
    return dispatch => {
        //dispatch(request({ userId }));

        service.fake(proposalId)
            .then(
                data => {
                    dispatch(success(data));
                    //  history.push('/');
                },
                error => {
                   //dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    //function request() { return { type: DATA_REQUEST } }
    function success(data) { return { type: CANDIDATE_FAKE_SUCCESS, data } }
   // function failure(error) { return { type: DATA_FAILURE, error } }
}
