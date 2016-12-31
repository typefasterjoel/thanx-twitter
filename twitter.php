<?php

header('Content-Type: application/json');
/**
 * Twitter API oAuth
 */
require "twitteroauth/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

define(CONSUMER_KEY, 'PUT CONSUMER TWITTER API KEY HERE');
define(CONSUMER_SECRET, 'PUT CONSUMER TWITTER API SECRET HERE');

$access_token = 'PUT ACCESS TOKEN HERE FOR USER';
$access_secret = 'PUT ACCESS TOKEN SECRET HERE FOR USER';

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token, $access_secret);


// Needs Caching to prevent API Limit to be reached.
// Caching can be done in two ways, one is generating a session (since We're using PHP) and store a timestamp.
// Then use that to compare and call every hour or 15 minutes or so. The time necessary depending on traffic that hits the site.
// and the second one is to generate a file with the loaded calls in it and apply a timestamp to them.
// Compare that to the current time and if 1 or 2 hours have passed, then go ahead and refresh, otherwise, keep loading the cached version.

/**
 * Set up Variables for the calls
 */
$twitter = 'thanxinc';

if((isset($_GET['thanx_tweets']) && $_GET['thanx_tweets'] == 1) || (isset($_GET['hashtag_thanx']) && $_GET['hashtag_thanx'] == 1)) {

	// If the request of the URL comes with thanx_tweets or hashtag_thanx then run the appropiate calls
	if($_GET['thanx_tweets']) {
		$tweets = $connection->get("statuses/user_timeline", ["screen_name" => $twitter]);

		foreach($tweets as $tweet) {
			$tweet->created_at = strtotime($tweet->created_at);
		}

		echo json_encode($tweets);
	}

	if($_GET['hashtag_thanx']) {
		$search = $connection->get("search/tweets", [ "q" => urlencode("#$twitter")]);
		$hashtags = $search->statuses;

		foreach($hashtags as $hashtag) {
			$hashtag->created_at = strtotime($hashtag->created_at);
		}

		echo json_encode($hashtags);
	}


} else {
	// Otherwise if they try something else via the URL, it should not let them do anything else.
	die('Please use a correct url parameter');
}

 ?>
