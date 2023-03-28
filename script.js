import config from "./apiKey.js"

const clientId = config.trevonClientId //Trevon Token
const client_secret = config.trevonSecertClientId
console.log(clientId)

/*
1. Create HTML elements (give them ids)
2. Create variables for those DOM elements in JavaScript
3. Fetch data
4. Convert from JSON
5. Use the data to manipulate the DOM elements.
*/




const redirect_uri = `http://127.0.0.1:5500/AT/index.html`


function requestAuthorization(){
    const AUTHORIZE = "https://accounts.spotify.com/authorize"
    const client_id = document.getElementById("clientid")
    const client_secret = document.getElementById("secretid")
    localStorage.setItem("clientid", client_id)

    let url = AUTHORIZE;
    url += `?client_id=` + clientId;
    url += "&response_type=code" 
    url += "&redirect_uri=" + encodeURI(redirect_uri)
    url += "&show_dialog=true"
    url += "user-read-private user-read-user-top-read user-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-read-birthdate user-read-email"
    window.location.href = url;
    
}
document.getElementById("button").addEventListener( "click", (e) => {
    requestAuthorization()
})




// const go = async ()=> {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic' + btoa(clientId + ":" + client_secret)
//     },
//     body: `grant_type=client_credentials`
//     })
//     const data = await response.json()
//     console.log(data)
// }
// go()

var auth = 'Basic ' + (clientId + ':' + client_secret).toString('base64');
var data = 'grant_type=client_credentials'
var options = {
    hostname:'accounts.spotify.com',
    path:'/api/token',
    method: 'POST',
    headers:{
        'Authorization': auth,
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};




    

    
//Example Fetch ==============================

// const endpoint = "https://api.spotify.com/v1/recommendations";
// const artists = '6sFIWsNpZYqfjUpaCgueju';
// const danceability = encodeURIComponent('0.9');

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
//============================================

//Helper Function================================
const fetchFrom = async function (url){
    try {
        const response = await fetch(url, {
              method: "GET",
              headers: {
                  Authorization: `Bearer BQA-ySDYeNKdFpHsSXG_z15R9rUwMP0mwryIMfvj7BmAfq4T-81F4kVPRkMYQqNuyHTCoKAS9llVtFj9GdY8SIiAdWtTqxWSHIQpj7BtG-5mJt9H4M1i
                  `
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
//============================================


const spotifyUrl = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl'
const artistUrl = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
const urll = `https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6`


async function search(){
    const data = await fetchFrom(spotifyUrl)
    const name = data.acousticness
    console.log(data)
    console.log(name)
}
search()






//===================AUTHORIZATION=============================================
// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=8000899d5e9e48a4b3247707457bda87&client_secret=0a9415cd75634018bcfce83622defd36"
//==============================================================================
/*
 async function generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
          return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
      
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
      
        return base64encode(digest);
      }
    
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email';
    
      localStorage.setItem('code-verifier', codeVerifier);
    
      let args = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });
    
      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
   
  });
    
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  
let body = new URLSearchParams({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirectUri,
  client_id: client_id,
  code_verifier: codeVerifier
*/