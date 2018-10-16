<?php

cantt_partial('layout/start.php', array(
	'doc_title' => $board->get_name(),
));

?>

<h1><?= $board->get_name(); ?></h1>


<section class="board">
	<header>
		<ul>
			<li>
				<p>October</p>
				<ul>
					<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li><li>29</li><li>30</li><li>31</li>
				</ul>
			</li>
			<li>
				<p>November</p>
				<ul>
					<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li><li>25</li><li>26</li><li>27</li><li>28</li><li>29</li><li>30</li><li>31</li>
				</ul>
			</li>
		</ul>
	</header>

	<div>
		<ul>
			<li>
				<label>Figure this out</label>
				<div style="left:120px;width:60px;"></div>
			</li>
			<li>
				<label>This one's longer and hopefully linebreaks</label>
				<div style="left:240px;width:60px;"></div>
			</li>
		</ul>
	</div>
</section>

<?php

cantt_partial('layout/end.php');