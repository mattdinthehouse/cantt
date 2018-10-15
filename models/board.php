<?php

final class Cantt_Board {

	private $name = '';

	private $tasks = array();


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

	public function add_task($task) {
		$this->tasks[] = $task;
	}

	public function get_tasks() {
		return $this->tasks;
	}
}