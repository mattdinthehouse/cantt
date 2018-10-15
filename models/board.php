<?php

final class Cantt_Board {

	private $name = '';

	private $tasks = array();


	public function set_name($name) {
		$this->name = $name;
	}

	public function add_task($task) {
		$this->tasks[] = $task;
	}
}