<?php

cantt_partial('layout/start.php', array(
	'doc_title' => $board->get_name(),
));

?>

<h1><?= $board->get_name(); ?></h1>

<section class="board">
</section>

<?php

cantt_partial('layout/end.php');