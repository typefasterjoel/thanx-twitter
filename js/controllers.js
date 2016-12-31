var ThanxControllers = angular.module('Thanx.Controllers', []);

ThanxControllers.controller('ThanxUserController', ['$scope', 'TwitterApiCalls', function($scope, TwitterApiCalls) {

	// Get the ThanxInc User timeline and store it in our scope.
	TwitterApiCalls.getUserTweets().then(function(res) {
		$scope.timeline = res.data;
		// console.log($scope.timeline); Debugging
	});

}]);

ThanxControllers.controller('ThanxHashtagController', ['$scope', 'TwitterApiCalls', function($scope, TwitterApiCalls) {

	// Get the results for a search from #ThanxInc
	TwitterApiCalls.getHashtagTweets().then(function(res) {
		$scope.hashtags = res.data;
		// console.log('----------------------');
		// console.log($scope.hashtags); Debugging
	});

}]);
