import config from "./apiKey.js"

const clientId = config.trevonClientId //Trevon Token
const client_secret = config.trevonSecertClientId
// console.log(clientId)


// function requestAuthorization(){
//     const AUTHORIZE = "https://accounts.spotify.com/authorize"
//     const client_id = document.getElementById("clientid")
//     const client_secret = document.getElementById("secretid")
//     localStorage.setItem("clientid", client_id)

//     let url = AUTHORIZE;
//     url += `?client_id=` + clientId;
//     url += "&response_type=code" 
//     url += "&redirect_uri=" + encodeURI(redirect_uri)
//     url += "&show_dialog=true"
//     url += "user-read-private user-read-user-top-read user-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-read-birthdate user-read-email"
//     window.location.href = url;
    
// }




//======Obtains parameters from the hash of the URL========
   
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var stateKey = 'spotify_auth_state';
  var params = getHashParams();
//ACCESS TOKEN=========================
  var access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);
//============================
(function() {

 //==== Generates a random string containing numbers and letters==
 
  function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  // var userProfileSource = document.getElementById('user-profile-template').innerHTML,
  //     userProfileTemplate = Handlebars.compile(userProfileSource),
  //     userProfilePlaceholder = document.getElementById('user-profile');

  //     oauthSource = document.getElementById('oauth-template').innerHTML,
  //     oauthTemplate = Handlebars.compile(oauthSource),
  //     oauthPlaceholder = document.getElementById('oauth');


    document.getElementById('button').addEventListener('click', function()  {
      
      const redirect_uri = `http://127.0.0.1:5500/AT/index.html`; // Your redirect uri

      var state = generateRandomString(16);

      localStorage.setItem(stateKey, state);
      var scope = 'user-read-private user-read-email';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(clientId);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
    }, false);
  
})();

    

    
//Example Fetch ==============================

// const endpoint = "https://api.spotify.com/v1/recommendations";
// const artists = '6sFIWsNpZYqfjUpaCgueju';
// const danceability = encodeURIComponent('0.9');

// fetch(`${endpoint}?seed_artists=${artists}&target_danceability=${danceability}`, {
//   method: "GET",
//   headers: {
//       Authorization: `Bearer ${access_token}`
//   }
// })
// .then(response => response.json())
// .then(({tracks}) => {
//   tracks.forEach(item => {
//     console.log(`${item.name} by ${item.artists[0].name}`);
//   })
// })


//Helper Function for obtaining Spotify DATA=======================
const fetchFrom = async function (url){
    try {
        const response = await fetch(url, {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${access_token}
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
//=========================================================================