import config from "./apiKey.js"
//Trevon Client Id==================================
const clientId = config.trevonClientId 
const secertClientId = config.trevonSecertClientId
//Amanda's Client Id================================
const amandaClientId= config.amandaClientId
const amandaSecretClientId = config.amandaSecretClientId

//HTML ELEMENTS=====================================
const search = document.querySelector(".search")

console.log(search)



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


    document.getElementById('search-bar').addEventListener('click', function()  {
      
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

const artistName = "Rihanna"
const spotifyUrl = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl'
const artistUrl = 'https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl'
const searchUrl = `https://api.spotify.com/v1/search?query=${artistName}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`

async function dataFetch(){
    const dataFeature = await fetchFrom(spotifyUrl)
    const dataSearch = await fetchFrom(searchUrl)
    const acousticness = dataFeature.acousticness
    console.log('data features:',dataFeature)
    console.log("acousticness", acousticness)
    console.log(dataSearch)
}
dataFetch()






//===================AUTHORIZATION=============================================
// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=8000899d5e9e48a4b3247707457bda87&client_secret=0a9415cd75634018bcfce83622defd36"
//=========================================================================