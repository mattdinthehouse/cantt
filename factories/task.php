<?php

require CANTT_DIR.'/models/task.php';

final class Cantt_Factory_Task extends Cantt_Factory {

	public function populate($task, $data) {
		if(!empty($data->name)) {
			$task->set_name((string) $data->name);
		}

		if(!empty($data->description)) {
			$task->set_description((string) $data->description);
		}

		return $task;
	}
}