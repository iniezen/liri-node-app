// Include NPM packages
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// fs is an NPM package for reading and writing files 
var fs = require('fs');

var keys=require('./keys.js');

// Store all of the arguments in an array 
var nodeArgs = process.argv;



// =========Twitter API Section==========================================================
if(nodeArgs[2]=="my-tweets"){
	 
	
	var client = new Twitter({
	  consumer_key: keys.consumer_key,
	  consumer_secret: keys.consumer_secret,
	  access_token_key: keys.access_token_key,
	  access_token_secret: keys.access_token_secret

	});





	var params = {screen_name: 'israelniezen'};
	client.get('statuses/user_timeline', {screen_name: 'israelniezen', count: 20}, function(error, tweets, response) {
	  if (!error) {

	  	for (var i=0; i<tweets.length; i++){


	    	console.log("Tweet: "+tweets[i].text+" Created on: "+tweets[i].created_at);
	    };	

	  }
	});






};
	// =========Spotify API Section==========================================================

if(nodeArgs[2]=="spotify-this-song"){

	var songName = "";


	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length){

			songName = songName + "+" + nodeArgs[i];

		}

		else {

			songName = songName + nodeArgs[i];
		}
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    // console.log(songName);


	    // * Artist(s)
	    console.log("");
		console.log('Artist Name: '+data.tracks.items[0].artists[0].name);
		console.log("");
	    // * The song's name
		console.log('Song Name: '+data.tracks.items[0].name);
		console.log("");
	    // * A preview link of the song from Spotify
		console.log('Spotify Preview Link: '+data.tracks.items[0].preview_url);
		console.log("");
	    // * The album that the song is from
		console.log('Album Name: '+data.tracks.items[0].album.name);
		console.log("");
	});    
};
	// =========OMDB API Section==========================================================
if(nodeArgs[2]=="movie-this"){
	// Create an empty variable for holding the movie name
	var movieName = "";

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s
	for (var i=3; i<nodeArgs.length; i++){

		if (i>3 && i< nodeArgs.length){

			movieName = movieName + "+" + nodeArgs[i];

		}

		else {

			movieName = movieName + nodeArgs[i];
		}
	}

	// Then run a request to the OMDB API with the movie specified 
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';

	// This line is just to help us debug against the actual URL.  
	// console.log(queryUrl);

	request(queryUrl, function (error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode == 200) {

			// Parse the body of the JSON response and recover what we need: 
			console.log("");
			//   * Title of the movie.
			console.log("Movie Title: " + JSON.parse(body)["Title"])
			console.log("");
	   		 // * Year the movie came out.
	    	console.log("Release Year: " + JSON.parse(body)["Year"])
			console.log("");
	   		 // * IMDB Rating of the movie.
			console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
			console.log("");
	   		 // * Country where the movie was produced.
	    	console.log("Country: " + JSON.parse(body)["Country"])
			console.log("");
	   		 // * Language of the movie.
	    	console.log("Language: " + JSON.parse(body)["Language"])
			console.log("");
	   		 // * Plot of the movie.
	    	console.log("Plot: " + JSON.parse(body)["Plot"])
			console.log("");
	   		 // * Actors in the movie.
	    	console.log("Actors: " + JSON.parse(body)["Actors"])
			console.log("");
	   		 // * Rotten Tomatoes Rating.
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
			console.log("");
	   		 // * Rotten Tomatoes URL
	    	console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
	    	console.log("");
		}
	});
};	