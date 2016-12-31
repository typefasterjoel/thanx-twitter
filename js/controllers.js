var ThanxControllers = angular.module('Thanx.Controllers', []);

ThanxControllers.controller('ThanxUserController', ['$scope', 'TwitterApiCalls', function($scope, TwitterApiCalls) {

	TwitterApiCalls.getUserTweets().then(function(res) {
		$scope.timeline = res.data;
		console.log($scope.timeline);
	});

}]);

ThanxControllers.controller('ThanxHashtagController', ['$scope', 'TwitterApiCalls', function($scope, TwitterApiCalls) {

	TwitterApiCalls.getHashtagTweets().then(function(res) {
		$scope.hashtags = res.data;
		console.log('----------------------');
		console.log($scope.hashtags);
	});

}]);
