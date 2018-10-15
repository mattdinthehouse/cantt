<?php

require CANTT_DIR.'/models/board.php';

final class Cantt_Factory_Board extends Cantt_Factory {
	
	public function load($key, $revision) {
		if($key instanceof Cantt_Board) {
			$key = $key->get_key();
		}

		$path = CANTT_DIR.'/data/'.$key.'/'.$revision;
		if(!file_exists($path)) {
			throw new RuntimeException('Not found', 404);
		}

		$data = file_get_contents($path);
		$data = json_decode($data);

		if(!$data) {
			throw new RuntimeException('Unable to read "'.$path.'": ('.json_last_error().') '.json_last_error_msg(), 500);
		}

		$board = $this->populate(new Cantt_Board, $data);

		return $board;
	}

	private function populate($board, $data) {
		if(!empty($data->name)) {
			$board->set_name((string) $data->name);
		}

		if(!empty($data->tasks) && is_array($data->tasks)) {
			$task_factory = cantt_factory('task');

			foreach($data->tasks as $task_data) {
				$task = $task_factory->populate(new Cantt_Task, $task_data);

				$board->add_task($task);
			}
		}

		return $board;
	}
}