import config from "./apiKey.js"

const treyClientId = config.trevonClientId //Trevon ClientId
const treySecertClientId = config.trevonSecertClientId
//Amanda's Token
const amandaClientId= config.amandaClientId
const amandaSecretClientId = config.amandaSecretClientId
console.log(amandaClientId)
//console.log(treyClientId)


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
                  Authorization: `Bearer BQDwJwzcm_dE4nfM1N5L4KqYzj30TWALIykXCn7a_GbvNI4bPm9vKZ79E4gJRIHI1JsW8fDkfQ9-UkrY2iG60YfF7is-QwR4idqO8k5e8Xc191VWZboH`
              }
            })
        const data = await response.json();
        //console.log(data);
        return data
    }
    catch(error){
        console.log("There was an error.",error);
    }
}
/*
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=7a48cb940a244a798500cc4b69eedb42&client_secret=d698d0aee7d04d07a85a9bd101095d35"
*/

const spotifyUrl = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl'
const artistUrl = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
const urll = `https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6`


async function search(){
    const data = await fetchFrom(spotifyUrl)
    //const name = data.artists[0].name
    console.log (data)
   // console.log(name)
}
search()
