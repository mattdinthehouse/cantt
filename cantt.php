<?php

define('CANTT_DIR', dirname(__FILE__));

require CANTT_DIR.'/config.php';

require CANTT_DIR.'/utils.php';

if(!CANTT_PROD) {
	error_reporting(E_ALL);
	ini_set('display_errors', 'on');
	ini_set('error_log', CANTT_ERRORLOG_PATH);
}

date_default_timezone_set(CANTT_DATA_TIMEZONE);

require CANTT_DIR.'/router.php';
