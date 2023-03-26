import config from "./apiKey.js"

const treyToken = config.trevonApiKey //Trevon Token
const treySecert = config.trevonSecertApiKey
console.log(treyToken)

/*
1. Create HTML elements (give them ids)
2. Create variables for those DOM elements in JavaScript
3. Fetch data
4. Convert from JSON
5. Use the data to manipulate the DOM elements.
*/

//Helper Fetch Function 

// const clientid = treyToken
// const clientSecret = treySecert
// // private methods
// const _getToken = async () => {
// const result = await fetch(`https://accounts.spotify.com/api/token`,{
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Authorization' : 'Basic' + btoa(clientid + ':' + clientSecret)
//     },
//     body : 'grant_type = client_credentials'
//     })

// const data  = await result.json();
// console.log(data)
// return data.access_token;
// }
// _getToken()


const endpoint = "https://api.spotify.com/v1/recommendations";
const artists = '6sFIWsNpZYqfjUpaCgueju';
const danceability = encodeURIComponent('0.9');

// fetch(`${endpoint}?seed_artists=${artists}&target_danceability=${danceability}`, {
//   method: "GET",
//   headers: {
//       Authorization: `Bearer ${treyToken}`
//   }
// })
// .then(response => response.json())
// .then(({tracks}) => {
//   tracks.forEach(item => {
//     console.log(`${item.name} by ${item.artists[0].name}`);
//   })
// })



const fetchFrom = async function (url){
    try {
        const response = await fetch(url, {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${treyToken}`
              }
            })
        const data = await response.json();
        // console.log(data);
        return data
    }
    catch(error){
        console.log("There was an error.",error);
    }
}

const spotifyUrl = 'https://api.spotify.com/v1/me/albums'
const artistUrl = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
const urll = `https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6`


async function search(){
    const data = await fetchFrom(spotifyUrl)
    const name = data.artists[0].name
    console.log(data)
    console.log(name)
}
search()
