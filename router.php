<?php

$method = $_SERVER['REQUEST_METHOD'];

$path = explode('?', $_SERVER['REQUEST_URI'], 2)[0]; // just the path, no query string
$path = explode('/', $path);
$path = array_map('urldecode', $path);
$path = array_map('trim', $path);
$path = array_filter($path);
$path = array_values($path); // rebase the keys

$page = null;

if(empty($path)) {
	$page = cantt_page('index');
}
else {
	switch($path[0]) {
		case 'auth':
			// TODO:
			break;

		default:
			$page = cantt_page('board');
			break;
	}
}

ob_start();
	try {
		$page->prepare($method, $path);
		$page->render();
	}
	catch(Exception $e) {
		ob_clean();

		http_response_code($e->getCode());

		cantt_partial('exception.php', $e);
	}
ob_end_flush();
