<?php

final class Cantt_Task {

	private $name = '';

	private $description = '';


	public function set_name($name) {
		$this->name = $name;
	}

	public function get_name($formatted = true) {
		$name = $this->name;

		if($formatted) {
			$name = htmlspecialchars($name);
		}

		return $name;
	}

	public function set_description($description) {
		$this->description = $description;
	}

	public function get_description($formatted = true) {
		$description = $this->description;

		if($formatted) {
			$description = htmlspecialchars($description);
			$description = nl2br($description);
		}

		return $description;
	}
}