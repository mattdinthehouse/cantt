<?php

function cantt_partial($path, $this = null, $args = array()) {
	extract($args);

	include CANTT_DIR.'/partials/'.$path;
}

function cantt_page($name) {
	require_once CANTT_DIR.'/pages/_base.php';
	require_once CANTT_DIR.'/pages/'.strtolower($name).'.php';

	$classname = 'Cantt_Page_'.$name;

	return new $classname;
}

function cantt_factory($name) {
	require_once CANTT_DIR.'/factories/_base.php';
	require_once CANTT_DIR.'/factories/'.strtolower($name).'.php';

	$classname = 'Cantt_Factory_'.$name;

	return new $classname;
}