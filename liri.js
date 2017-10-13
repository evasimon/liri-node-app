// reads the twitterKeys object from keys.js
var twitterKeysINeed = require('./keys.js');

var command = process.argv[2];

// for `node liri.js my-tweets`
// * This will show your last 20 tweets and when they
// were created at in your terminal/bash window.
if (command = 'my-tweets') {
  // loads twitter library
  var Twitter = require('twitter');

  // creates a new instace of the Twitter object
  var client = new Twitter(twitterKeysINeed);

  var params = { screen_name: 'escoding' };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {

    if (!error) {
      for (var i = 0; i < 20; i++) {
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