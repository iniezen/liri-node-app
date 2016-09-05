// Include NPM packages
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
// fs is an NPM package for reading and writing files 
var fs = require('fs');

var keys=require('./keys.js');

// Store all of the arguments in an array 
var nodeArgs = process.argv;

var dataArr;




// start with "do-what-it-says"..change the order around and set functions to variables and that should work


	// =========do-what-it-says Section==========================================================
if(nodeArgs[2]=="do-what-it-says"){
// This block of code will read from the "random.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data" 
	fs.readFile("random.txt", "utf8", function(error, data) {

		// We will then print the contents of data
		// console.log(data);

		// Then split it by commas (to make it more readable)
		dataArr = data.split(',');

		// console.log(dataArr);
		// console.log(dataArr[0]);
		// console.log(dataArr[1]);

		nodeArgs[2]=dataArr[0];
		nodeArgs[3]=dataArr[1];
		console.log(nodeArgs[2]);




		// We will then re-display the content with the split for aesthetics.

		// var newDataArr = dataArr.map(function(thing){


		// 	console.log(thing);
		
	});






};



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
	    	console.log("");
	    };	

	  }
	});

};
	// =========Spotify API Section==========================================================

if(nodeArgs[2]=="spotify-this-song" && nodeArgs.length>3){

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


// handle if no name is given to default to "the sign"=================================

if(nodeArgs[2]=="spotify-this-song" && nodeArgs.length===3){

	var defaultSong = "the sign";



	spotify.search({ type: 'track', query: defaultSong }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
// commented out console.logs for tests
	    // console.log(defaultSong);


	    // // * Artist(s)
	    // console.log(data);
	 //    console.log("");
		console.log('Artist Name: '+data.tracks.items[4].artists[0].name);
		console.log("");
	    // * The song's name
		console.log('Song Name: '+data.tracks.items[4].name);
		console.log("");
	    // * A preview link of the song from Spotify
		console.log('Spotify Preview Link: '+data.tracks.items[4].preview_url);
		console.log("");
	    // * The album that the song is from
		console.log('Album Name: '+data.tracks.items[4].album.name);
		console.log("");
	});    
};


	// =========OMDB API Section==========================================================
if(nodeArgs[2]=="movie-this" & nodeArgs.length>3){
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


	// =========Handle missing Argv in movie-this to Default Mr. Nobody==========================================================
if(nodeArgs[2]=="movie-this" & nodeArgs.length===3){
	// Create an empty variable for holding the movie name
	var movieName = "Mr. Nobody";



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

