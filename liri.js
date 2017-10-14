// reads the Keys from keys.js
var keysINeed = require('./keys.js');
// loads the dependesies needed
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// sets argument variables
var command = process.argv[2];
var songName = process.argv[3];
var movieName = process.argv[3];

// checks for defaults
if ( process.argv[3] === undefined ) {
  songName = 'The Sign';
}

// checks for command
switch (command) {
  case 'my-tweets':
    tweets();
    break;

  case 'spotify-this-song':
    spotify();
    break;

  case 'movie-this':
    imdb();
    break;
}

// for `node liri.js my-tweets`
// * This will show your last 20 tweets and when they
// were created at in your terminal/bash window.
function tweets() {

    // creates a new instace of the Twitter object
    var client = new Twitter(keysINeed.twitterKeys);

    var params = {
      screen_name: 'escoding',
      limit: 20 
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

      if (!error) {
        for (var i = 0; i < tweets.length; i++) {
          var tweetText = tweets[i].text;
          var tweetCreated = tweets[i].created_at;
          console.log(tweetText);
          console.log(tweetCreated);
        }
        // console.log(tweets);
      } else {
        return console.log(error);

      }

    });
}

function spotify() {
 
  var spotify = new Spotify(keysINeed.spotifyKeys);

  params = {
    type: 'track',
    query: songName,
    limit: 1
  }
   
  spotify.search(params, function(err, data) {
    // console.log(JSON.stringify(data, null, 2));

    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    var name = JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2);
    var song = JSON.stringify(data.tracks.items[0].name, null, 2);
    var url = JSON.stringify(data.tracks.items[0].preview_url, null, 2);
    var album = JSON.stringify(data.tracks.items[0].album.name, null, 2);

    console.log("********************************************");
    console.log(`Artist(s): ${name}`);
    console.log(`The Song's name: ${song}`);
    console.log(`Spotify URL: ${url}`);
    console.log(`Album's name: ${album}`);
    console.log("********************************************");
  });
}

function imdb() {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {
    var dataObj = JSON.parse(body);
    // If the request is successful
    if (!error && response.statusCode === 200) {

      var title = dataObj.Title;
      var year = dataObj.Year;
      var imdbRating = dataObj.imdbRating;
      var rtRating = dataObj.Ratings[1].Value;
      var country = dataObj.Country;
      var language = dataObj.Language;
      var plot = dataObj.Plot;
      var actors = dataObj.Actors;

      console.log("********************************************");
      console.log(`Movie Title: ${title}`);
      console.log(`Release Year: ${year}`);
      console.log(`IMDB Rating: ${imdbRating}`);
      console.log(`Rotten Tomatoes Rating: ${rtRating}`);
      console.log(`Country: ${country}`);
      console.log(`Language: ${language}`);
      console.log(`Plot: ${plot}`);
      console.log(`Actors: ${actors}`);
      console.log("********************************************");
    }
  });
}



