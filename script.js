import config from "./apiKey.js"
//Trevon Client Id==================================
const clientId = config.trevonClientId 
const secertClientId = config.trevonSecertClientId
//Amanda's Client Id================================
const amandaClientId= config.amandaClientId
const amandaSecretClientId = config.amandaSecretClientId

//HTML ELEMENTS=====================================
const search = document.querySelector(".search")
const searchResults = document.querySelector("#results")
const inputElement = document.getElementById("searcher");

let placeholder = inputElement.placeholder;
const checkbox = document.querySelector("input[name=toggle]");



  



localStorage.setItem("base_uri", window.location);

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
      const redirect_uri = localStorage.getItem("base_uri"); // Your redirect uri
      // const redirect_uri = `http://127.0.0.1:5500/AT/index.html`; // Your redirect uri
     

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


//==============================================


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
//========================================

//Example Fetch ==============================

/*
async function danceability(){

  const endpoint = "https://api.spotify.com/v1/recommendations";
  const artists = '6sFIWsNpZYqfjUpaCgueju';
  const danceability = encodeURIComponent('0.9');

  const dance = await fetchFrom(`${endpoint}?seed_artists=${artists}&target_danceability=${danceability}`)

 
  console.log("DANCE:",`${item.name} by ${item.artists[0].name}`);

}

danceability()
*/

//function to remove all child nodes//==============
function removeAllChildNodes(node) { 
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

///======================================

const spotifyUrl = 'https://api.spotify.com/v1/audio-features/11dFghVXANMlKmJXsNCbNl'

const recommendationsUrl = "https://api.spotify.com/v1/recommendations"


async function getRecommendations(){
  const recommendationsData = await fetchFrom (recommendationsUrl + `?seed_artists=4NHQUGzhtTLFvgF5SZesLK&country,classical&limit=5`)
  

  const recommendations = document.querySelector(".recommendations")
  const songsList = document.createElement("ul")
  songsList.id = "songs"

  console.log("songsList:",songsList)
  
 
  
  
  console.log(recommendationsData)
 
  console.log(recommendationsData.tracks[0].album.images[0].url)
  console.log(recommendationsData.tracks[0].artists.explicit)

  removeAllChildNodes(searchResults) 
  removeAllChildNodes(songsList)
  removeAllChildNodes(recommendations)
  removeAllChildNodes(search)
  
  
  
  for(let i = 0; i < 5; i++){
  //Variables=================================================================
  const songName=recommendationsData.tracks[i].name
  const name = recommendationsData.tracks[i].artists[0].name
  const songImg = recommendationsData.tracks[i].album.images[0].url
  const songUrl=recommendationsData.tracks[i].external_urls.spotify
  //Elements================================================================
  let mainDiv = document.createElement("div")
  let leftDiv = document.createElement("div")
  let cenetrDiv = document.createElement("div")
  let rightDiv = document.createElement("div")
  recommendations.appendChild(mainDiv)

  
  const songInList = document.createElement("li")
  const anchor = document.createElement("a")
  const artistName = document.createElement("b")
  const img = document.createElement("img")
  const playButton = document.createElement("img")
  
  //Classes================================================================
  songInList.id ="songInList" //ID NAME FOR RECOMMENDED SONGS
  img.id = "recommendationsImg"
  playButton.id = "playButton" 
  mainDiv.id = "mainDiv"
  leftDiv.id ="leftDiv"
  cenetrDiv.id = "cenetrDiv"
  rightDiv.id = "rightDiv"
 
  //Append================================================================
  
  mainDiv.appendChild(leftDiv)
  mainDiv.appendChild(cenetrDiv)
  mainDiv.appendChild(rightDiv)

  leftDiv.appendChild(img)
  leftDiv.append(playButton)

  songsList.appendChild(songInList)
  cenetrDiv.appendChild(artistName)

  cenetrDiv.appendChild(songInList)
  songInList.appendChild(anchor)

  console.log("mainDiv",mainDiv)
 

  artistName.innerText = name
  songInList.innerText= songName
  anchor.href = songUrl
  img.src= songImg
  playButton.src ="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzMiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGxheTwvdGl0bGU+PHBhdGggZD0iTTMwLjE3IDIwLjcwOEw0LjcxIDM1LjU4OGMtLjQ5Ni4zMjgtMS4wNzQuNDEyLTEuNTY4LjQxMi0uNDk4IDAtMS4wNzYtLjA4NC0xLjU3LS40MTMtLjk5LS40OTgtMS41Ny0xLjU3LTEuNTctMi43M0wwIDMuMTAyQzAgMS45NDYuNjYyLjg3IDEuNTcuMzc0Yy45OS0uNDk3IDIuMjMtLjQ5NyAzLjE0IDBMMzAuMTcgMTUuMjVjLjk5Mi41IDEuNTcgMS41NyAxLjU3IDIuNzMuMDAzIDEuMTU2LS42NiAyLjIzLTEuNTcgMi43Mjh6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
  
  
  mainDiv.addEventListener("click", function(e) {
    window.open(songUrl) 
  });

  }
 
  console.log("recommendations:",recommendations)
}



//SEARCH TAB FUNCTION =================================
const namesFromDOM = document.getElementsByClassName("name");

search.addEventListener("keyup", (e) => {
  let {value} = e.target;
 
  
  console.log("value:",value)
  
  searchResults.addEventListener("click", (e) => {
   
    getRecommendations() 
    
    
  })
  

  if (checkbox.checked) {
    inputElement.placeholder = "Search By Artist";
    
    searchArtist(value)
    console.log("checked")
  } else {
    inputElement.placeholder = "Search By Track";
    
    searchTracks(value)
    console.log("not checked")
  }
  
  // get user search input converted to lowercase
  const searchQuery = value.toLowerCase();
  
  for (const nameElement of namesFromDOM) {
      // store name text and convert to lowercase
      let name = nameElement.textContent.toLowerCase();
     
      
      // compare current name to search input
      if (name.includes(searchQuery)) {
          // found name matching search, display it
          nameElement.style.display = "block";
          
      } else {
          // no match, don't display name
          nameElement.style.display = "none";
      }
      
  }
 
});


const searchUrl = `https://api.spotify.com/v1/search`



//Tracks============================================================
async function searchTracks (value) {
  const dataTrack = await fetchFrom(searchUrl + `?query=${value}&type=track&offset=0&limit=7`)
 
  removeAllChildNodes(searchResults)
  for (let i = 0; i < 7; i++){
    //Variables=================================================================
    const trackUrl = dataTrack.tracks.items[i].album.external_urls.spotify
    const trackName = dataTrack.tracks.items[i].name
    const tracktImg = dataTrack.tracks.items[i].album.images[0].url
    //Create Elements================================================================================
    const list = document.createElement("li")
    const img = document.createElement("img")
    const anchor = document.createElement("a")
    //Classes================================================================
    img.id = "trackimg"
    list.id  = "trackList"
    console.log(list)
    //Append============================================================
    searchResults.appendChild(list)
    list.appendChild(img)
    list.appendChild(anchor)
    //Assign================================================================================
    anchor.innerText = trackName
    img.src = tracktImg
    // anchor.href = trackUrl
 }
  
}


//Artists===========================================================
async function searchArtist(value){

  const dataSearch = await fetchFrom(searchUrl +`?query=${value}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`)

  removeAllChildNodes(searchResults)
  for (let i = 0; i < 8; i++){
    //Variables=================================================================
    const artistUrl = dataSearch.artists.items[i].external_urls.spotify
    const artistName = dataSearch.artists.items[i].name
    const artistImg = dataSearch.artists.items[i].images[0].url
    //Create Elements================================================================================
    const list = document.createElement("li")
    const anchor = document.createElement("a")
    const img = document.createElement("img")
    //Append============================================================
    searchResults.appendChild(list)
    list.appendChild(img)
    list.appendChild(anchor)
    //Classes============================================================
    img.id = "artistimg"
    list.id = "artsitList"
    //Assign================================================================================
    anchor.innerText = artistName
    // anchor.href = artistUrl
    img.src = artistImg
      
  }
}




checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    inputElement.placeholder = "Search By Artist";
    console.log("checked")
  } else {
    inputElement.placeholder = "Search By Track";
    console.log("not checked")
  }
})



//===================AUTHORIZATION=============================================
// curl -X POST "https://accounts.spotify.com/api/token" \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -d "grant_type=client_credentials&client_id=8000899d5e9e48a4b3247707457bda87&client_secret=0a9415cd75634018bcfce83622defd36"
//=============================================================================