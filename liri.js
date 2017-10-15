// reads the Keys from keys.js
var keysINeed = require('./keys.js');
// loads the dependesies needed
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// retrieves user input data
function input(command, chosenInput){
  var printInput;
  // checks for user input
  if (chosenInput === undefined) {
    // checks for user command
    if ( command ===  'spotify-this-song') {
      // sets default if no song was chosen
      chosenInput = '"The Sign" by Ace of Base';
    } else if ( command ===  'movie-this' ) {
      // sets default if no movie was chosen
      chosenInput = 'Mr. Nobody';
    }
  }

  // checks for command
  switch (command) {
    case 'my-tweets':
      tweets();
      break;

    case 'spotify-this-song':
      spotify(chosenInput);
      break;

    case 'movie-this':
      imdb(chosenInput);
      break;

      case 'do-what-it-says':
      random();
      break;
  }

  // formats the user inputs
  printInput = `\n********************************************\n` 
              + `${command} ${chosenInput}`
              + `\n********************************************\n`
  // displays user input to terminal/bash and writes it to log.txt 
  saveData(printInput);

}

// for `node liri.js my-tweets`
// retrieves the latest 20 tweets and
// when they were created
function tweets() {
  // creates a new instace of the Twitter object
  var client = new Twitter(keysINeed.twitterKeys);
  // sets the query parameters
  var params = {
    screen_name: 'escoding',
    limit: 20 
  };
  // gets the tweets as response
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    // checks for errors
    if (!error) {
      // gets each tweet
      for (var i = 0; i < tweets.length; i++) {
        var tweetText = tweets[i].text;
        var tweetCreated = tweets[i].created_at;
        // formats the data that is being displayed
        var printTweets = `\n   ********************************************\n`
                        + `   Tweet: ${tweetText}\n`
                        + `   Date: ${tweetCreated}\n`
                        + `   ********************************************\n`
        // prints each tweet to terminal and log.txt
        saveData(printTweets);
      }
    } else {
      return console.log(error);

    }

  });
}

// for `node liri.js spotify-this-song '<song name here>'`
// retrieves information abut the song
function spotify(songTitle) {
  // creates a new instace of the Spotify object
  var spotify = new Spotify(keysINeed.spotifyKeys);
  // sets query parameters
  params = {
    type: 'track',
    query: songTitle,
    limit: 1
  }
  // searches for the songs' info
  spotify.search(params, function(err, data) {
    // console.log(JSON.stringify(data, null, 2));

    // checks for errors
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      // gets data from the object
      var dataTracksItem = data.tracks.items[0];

      var name = dataTracksItem.album.artists[0].name;
      var song = dataTracksItem.name;
      var url = dataTracksItem.preview_url;
      var album = dataTracksItem.album.name;
    
      // formats the display
      var printSong = `\n   ********************************************\n`
                    + `   Artist(s): ${name}\n`
                    + `   The Song's name: ${song}\n`
                    + `   Preview URL: ${url}\n`
                    + `   Album's name: ${album}\n`
                    + `   ********************************************\n`
      // prints song to terminal and log.txt
      saveData(printSong);
    }
  });
}

// for `node liri.js spotify-this-song '<movie name here>'`
// retrieves information abut the movie
function imdb(movieTitle) {
  // sets query url
  var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece";
  // sends request to retrieve data of the movie
  request(queryUrl, function(error, response, body) {
    // parses data into JSON object
    var dataObj = JSON.parse(body);
    // If the request is successful
    if (!error && response.statusCode === 200) {
      // gets the movie data
      var title = dataObj.Title;
      var year = dataObj.Year;
      var imdbRating = dataObj.imdbRating;
      var rtRating;
        // check for Rotten Tomatoed Ratings
        if (dataObj.Ratings[1] === undefined) {
          rtRating = "No Rotten Tomatoes Ratings available"
        } else {
          rtRating = dataObj.Ratings[1].Value;
        }
      var country = dataObj.Country;
      var language = dataObj.Language;
      var plot = dataObj.Plot;
      var actors = dataObj.Actors;

      // formats display
      var printMovie = `\n   ********************************************\n`
                      + `   Movie Title: ${title}\n`
                      + `   Release Year: ${year}\n`
                      + `   IMDB Rating: ${imdbRating}\n`
                      + `   Rotten Tomatoes Rating: ${rtRating}\n`
                      + `   Country: ${country}\n`
                      + `   Language: ${language}\n`
                      + `   Plot: ${plot}\n`
                      + `   Actors: ${actors}\n`
                      + `   ********************************************\n`
      // prints movie data
      saveData(printMovie);
    }
  });
}

// for `node liri.js do-what-it-says`
function random() {
  // reads content from random.txt
  fs.readFile('random.txt', 'utf8', function(err, data) {
    // checks for error
    if (err) {
      return console.log(err);
    }
    // splits content where ther is a comma. data is an array
    var data = data.split(',')
    // sends/sets values of data to input() function
    input(data[0], data[1]);
  })
}

// prints data to terminal/bash and writes data to log.txt
function saveData(log) {
  // writes result data to log.txt
  fs.appendFile("log.txt", log, function(err) {
      // If an error was experienced
      if (err) {
        console.log(err);
      }
      // If no error is experienced
      else {
        // displays result data to terminal
        console.log(log);
      }
    }
  )
}

// input function is called,
// passes the two argv arguments, entered by the user
input(process.argv[2],process.argv[3]);


















