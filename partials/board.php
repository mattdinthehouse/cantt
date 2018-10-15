<?php

cantt_partial('layout/start.php', array(
	'doc_title' => $board->get_name(),
));

?>

<h1><?= $board->get_name(); ?></h1>

<ul>
	<?php
		foreach($board->get_tasks() as $task) {
			?>
			<li>
				<h3><?= $task->get_name(); ?></h3>
				<p><?= $task->get_description(); ?></p>
			</li>
			<?php
		}
	?>
</ul>

<?php

cantt_partial('layout/end.php');