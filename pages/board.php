<?php

final class Cantt_Page_Board extends Cantt_Page {

	private $board;
	
	public function prepare($method, $path) {
		$revision = (string) array_shift($path); // 'latest' or 'YmdHi' date string
		$key      = implode('/', $path);

		if($revision !== 'latest') {
			$revision = DateTime::createFromFormat('YmdHi', $revision);

			if($revision) {
				$revision = $revision->format('YmdHi');
			}
		}

		if(!$revision) {
			throw new RuntimeException('Invalid revision', 400);
		}

		if(!$key) {
			throw new RuntimeException('Missing key', 400);
		}

		try {
			$this->board = cantt_factory('Board')->load($key, $revision);
		}
		catch(Exception $e) {
			if($e->getCode() < 500) {
				throw $e;
			}
			else {
				error_log($e->getMessage());

				throw new RuntimeException('Unable to load data', 500);
			}
		}
	}

	public function render() {
		cantt_partial('board.php', $this->board);
	}
}