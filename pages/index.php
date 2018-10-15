<?php

final class Cantt_Page_Index extends Cantt_Page {
	
	public function prepare($method, $path) {
		// Nothing
	}

	public function render() {
		cantt_partial('index.php', array(
			'self' => $this,
		));
	}
}