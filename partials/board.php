<?php

cantt_partial('layout/start.php', array(
	'doc_title' => $board->get_name(),
));

?>

<pre><?php var_dump($board); ?></pre>

<?php

cantt_partial('layout/end.php');