
import _ from 'lodash'
import Blockstack from '/imports/Blockstack'
import Dשםstack from '/imports/Daostack'



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
const getCandidatesData = async () => {
   let proposals = await Daostack.getProposals()
   return proposals.map((proposal,idx) => {
     let photo = _.get(proposal,"profile.image[0].contentUrl","https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-1/45418652_2141102242636679_111588077893320704_n.jpg?_nc_cat=107&_nc_ht=scontent.fhfa1-2.fna&oh=e66ce7906c5bacc8947662a8f1c35be5&oe=5C415570")
     let firstname = _.get(proposal,"profile.name","John Doe")
     // console.log({firstName})
     return {
         id:idx,
         proposalId:proposal.proposalId,
         photo,
         firstname,
         lastname:"",
         ethOffering:0.5334,
         socialMedia:{
             facebook:"https://www.facebook.com/gerihalliwell/",
             twitter:"https://twitter.com/GeriHalliwell?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
             linkedin:"https://www.linkedin.com/pulse/gerri-halliwell-bricks-leadership-lis-allen",
             instagram:"https://www.instagram.com/therealgerihalliwell/?hl=en",
             github:"https://github.com/edx/ease/blob/master/ease/tests/data/polarity/neg/cv051_10751.txt"
         }


       }
   })
   
}

export const service = {
    getData,getCandidatesData
};
