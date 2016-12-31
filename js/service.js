var ThanxServices = angular.module('Thanx.Services', []);

ThanxServices.factory('TwitterApiCalls', ['$http', function($http) {
	// Set up The calls
	var ThanxTwitterCalls = {};

	var twitterURL = 'twitter.php'; // URL of file that contains the connection to the Twitter API

	ThanxTwitterCalls.getUserTweets = function() {
		// Function to get the tweets from the user timeline
		return $http.get(twitterURL+'?thanx_tweets=1');
	}

	ThanxTwitterCalls.getHashtagTweets = function() {
		// function to get the search results for the hashtag
		return $http.get(twitterURL+'?hashtag_thanx=1');
	}


	return ThanxTwitterCalls; // return my object of services to use in the controllers.

}]);
