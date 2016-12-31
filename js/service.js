var ThanxServices = angular.module('Thanx.Services', []);

ThanxServices.factory('TwitterApiCalls', ['$http', function($http) {
	// Set up The calls
	var ThanxTwitterCalls = {};

	var twitterURL = '../twitter.php';

	ThanxTwitterCalls.getUserTweets = function() {
		return $http.get(twitterURL+'?thanx_tweets=1');
	}

	ThanxTwitterCalls.getHashtagTweets = function() {
		return $http.get(twitterURL+'?hashtag_thanx=1');
	}


	return ThanxTwitterCalls;

}]);
