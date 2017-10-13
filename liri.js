
// for ( var keys in twitterKeysINeed ) {

// }

// for (var key in bandList) {
//   console.log("A " + key + " band is " + bandList[key] + ".");
// }



// console.log(twitterKeysINeed);

// var command = process.argv[2];

// console.log(command);

// for  `node liri.js my-tweets`
// * This will show your last 20 tweets and when they
// were created at in your terminal/bash window.

// var Twitter = require('twitter');
// twitterKeysINeed.post(path, params, callback);

// var Twitter = require('twitter');

// console.log(Twitter);
 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

// reads the twitterKeys object from keys.js
var twitterKeysINeed = require('./keys.js');
// loads twitter library
var Twitter = require('twitter');

// creates a new instace of the Twitter object
var client = new Twitter(twitterKeysINeed);
 
var params = {screen_name: 'escoding'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);

  } else {
    return console.log(error);

  }

});

// twitterKeysINeed.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//    console.log(tweets);
// });