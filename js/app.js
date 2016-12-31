var ThanxTwitterApplication = angular.module('ThanxTwitter', [
	'ngSanitize',
	'Thanx.Services',
	'Thanx.Controllers'
])
.config(['$httpProvider', function($mdThemingProvider, $httpProvider) {

	// No config, too simple of an app.

}]).filter('tweets', ['$filter', '$sce', function($filter, $sce) {
	return function (text, target) {

		// This extends the filter of "linky" from angular's sanitize plug-in
		// and add links to hashtags and mentions on the tweets.
		if(!text) return text;

		var replacedText = $filter('linky')(text, target);
		var targetAttr = "";
		if(angular.isDefined(target)) {
			targetAttr = ' target="' + target + '"';
		}

		// replace #hashtag
		var replacePattern1 = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;
      	replacedText = replacedText.replace(replacePattern1, '$1<a href="https://twitter.com/search?q=%23$2"' + targetAttr + '>#$2</a>');

		var replacePattern2 = /(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="https://twitter.com/$2"' + targetAttr + '>@$2</a>');

		$sce.trustAsHtml(replacedText);
		return replacedText;
	}
}]);
