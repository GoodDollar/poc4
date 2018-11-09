
export const service = {
    getData,getCandidatesData
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

function getCandidatesData() {
   const candidates =
   [{
       id:1,
       proposalId:1987978,
       photo:"https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-1/45418652_2141102242636679_111588077893320704_n.jpg?_nc_cat=107&_nc_ht=scontent.fhfa1-2.fna&oh=e66ce7906c5bacc8947662a8f1c35be5&oe=5C415570",
       firstname:"Geri",
       lastname:"Halliwell",
       ethOffering:0.5334,
       socialMedia:{
           facebook:"https://www.facebook.com/gerihalliwell/",
           twitter:"https://twitter.com/GeriHalliwell?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
           linkedin:"https://www.linkedin.com/pulse/gerri-halliwell-bricks-leadership-lis-allen",
           instagram:"https://www.instagram.com/therealgerihalliwell/?hl=en",
           github:"https://github.com/edx/ease/blob/master/ease/tests/data/polarity/neg/cv051_10751.txt"
       }
   
   
     },
     {
       id:2,
       proposalId:2435423534,
       photo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0ODGnaKeoz3ffQi0jID50h294U7bAg_sbj8fIiGmqTOsyq0LHw",
       firstname:"Mark",
       lastname:"Boskowitz",
       ethOffering:500.534534,
       socialMedia:{
        facebook:"facebook.com",
        twitter:"twitter.com",
        linkedin:"linkedin.com",
        instagram:"instagram.com",
        github:"github.com"
    }
   
     },
     {
    
       id:3,
       proposalId:1232123,
       photo:"https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-background-constrast-solid.jpg",
       firstname:"Sibua",
       lastname:"Papao",
       ethOffering:54.534534,
       socialMedia:{
        facebook:"facebook.com",
        twitter:"twitter.com",
        linkedin:"linkedin.com",
        instagram:"instagram.com",
        github:"github.com"
    }
   
   
     }];
     
    return Promise.resolve(candidates)
}