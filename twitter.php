<?php

header('Content-Type: application/json');
/**
 * Twitter API oAuth
 */
require "twitteroauth/autoload.php";

use Abraham\TwitterOAuth\TwitterOAuth;

define(CONSUMER_KEY, 'QVsHj5cO4ZTUlFOwlApnoov87');
define(CONSUMER_SECRET, 'slH6dimD6SLjOYFW6nklEoKvXcIBwlbb3AAS9CG5rTr0bviX9k');

$access_token = '17310635-OmZP2D6nuiFvVCCUpAWIvwIXDc4wzCInOl8a7BOiY';
$access_secret = 'jOfnDFQeB3MX7FN2gMfSvvVCfED9UFt6geHt8BRceXDrt';

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token, $access_secret);


/**
 * Set up Variables for the calls
 */
$twitter = 'thanxinc';

if((isset($_GET['thanx_tweets']) && $_GET['thanx_tweets'] == 1) || (isset($_GET['hashtag_thanx']) && $_GET['hashtag_thanx'] == 1)) {

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
	die('Please use a correct url parameter');
}

 ?>
