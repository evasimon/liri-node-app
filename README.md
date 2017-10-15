# Liri Node App

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is be a command line node app that takes in parameters and gives you back data.


### How it works

To retrieve data that will power this app, we set requests to the Twitter, Spotify and OMDB APIs. Node packages (npm libraries) were used to build the requests.


### How to run LIRI

Enter your terminal or bash the following line of code. liri.js can take in one of the following commands:

* `node liri.js my-tweets` 
	* displays the latest 20 tweets and when they were created in the terminal/bash and adds them to a log.txt file

* `node liri.js spotify-this-song '<song name here>'`
	* shows informatin abut the song in the terminal/bash and adds them to a log.txt file
   	* if no song is provided the app will default to "The Sign" by Ace of Base.

* `node liri.js movie-this '<movie name here>'`
	* shows information about the movie in the terminal/bash and adds them to a log.txt file
	* if no movie is provided the app will default to 'Mr. Nobody'.

* `node liri.js do-what-it-says`
   	* using the `fs` npm, LIRI will take the text inside of random.txt and then use it to call the LIRI's commands.





