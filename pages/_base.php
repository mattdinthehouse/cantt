<?php

abstract class Cantt_Page {

	abstract public function prepare($method, $path);

	abstract public function render();
}