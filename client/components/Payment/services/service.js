import _ from 'lodash'
import Blockstack from '/imports/Blockstack'

export const service = {
    getData,vouche,fake
};

function getData() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    };

    return fetch('', requestOptions)
        .then(response => {
            if (!response.ok) {
                console.error("failed. error = "+response.statusText);
                return Promise.reject(response.statusText);
            }

            let jsonResponse = response.json();

            return jsonResponse;
        })
        .then(payload => {
            console.log("Response:"+payload);

            return payload;
        });
}
function vouche(amount,proposalId){
    console.log("vouch eamount:"+amount,proposalId);
    return Blockstack.iddao.vouch(proposalId,amount)
    // return Promise.resolve({})
}

function fake(amount){
    console.log("fake amount:"+amount)
    return Promise.resolve({})

}
