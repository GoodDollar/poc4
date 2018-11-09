
export const service = {
    getData
};

function getData() {
   const userData = {
    ethEarnd:32.33,
    gains:12.4,
    reputation:78,
    pending:[
        {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    }
    ]
    ,past:[
        {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    },
    {
        firstname:"Hadar",
        lastname:"Ben Maor",
        timeLeft:"13:45",
        ETH:"132.333",
        photo:"https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2011/04/profilephotos-960x640.jpg",
        vouched:true
    }
    ]
   }
    return Promise.resolve(userData)
}

