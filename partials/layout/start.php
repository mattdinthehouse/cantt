<?php

$doc_title = (!empty($doc_title) ? $doc_title.' - '.CANTT_DOC_TITLE : CANTT_DOC_TITLE);

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">

	<title><?= $doc_title; ?></title>

	<link rel="stylesheet" href="/styles/global.css"/>
	<link rel="stylesheet" href="/styles/board.css"/>
</head>
<body>