<?php

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

		return $data;
	}
}