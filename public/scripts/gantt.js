class Gantt {
	constructor(container) {
		this.CELL_WIDTH  = 32;
		this.CELL_HEIGHT = 32;

		this.startDate = new Date('2018-11-01 00:00:00');
		this.endDate   = new Date('2019-01-31 23:59:59');

		this.scaleType = 'Hours';

		this.svg = svg('svg', {
			'class':    'gantt',
			'appendTo': container,
			'width':    this.calculateScaleUnits(this.startDate, this.endDate) * this.CELL_WIDTH,
			'height':   500,
		});

		this.scale = new GanttScale(this);

		this.tasks = new GanttTasks(this);

		this.update();

		console.log(this);
	}

	update() {
		this.scale.update();
		this.tasks.update();
	}

	calculateScaleUnits(start, end) {
		let units = 0;

		switch(this.scaleType) {
			case 'Hours':
				units = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
				break;

			case 'Days':
				units = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
				break;
		}

		return units;
	}
}

class GanttScale {
	constructor(gantt) {
		this.gantt = gantt;

		this.element = svg('g', {
			'class':    'gantt-scale',
			'appendTo': this.gantt.svg,
		});
	}

	update() {
		this.updateScaleParts();
		this.renderScale();
	}

	updateScaleParts() {
		this.scaleParts  = [];

		let scaleMajor = undefined;
		let scaleMinor = undefined;

		const date = new Date(this.gantt.startDate.getTime());

		do {
			switch(this.gantt.scaleType) {
				case 'Hours':
					scaleMajor = dateDayName(date)+', '+dateMonthName(date)+' '+date.getDate();
					scaleMinor = date.getHours(); // TODO: Filter to working hours

					date.setHours(date.getHours() + 1);
					break;

				case 'Days':
					scaleMajor = dateMonthName(date);
					scaleMinor = date.getDate(); // TODO: Filter to working days

					date.setDate(date.getDate() + 1);
					break;
			}

			if(this.scaleParts.length < 1 || scaleMajor != this.scaleParts[this.scaleParts.length - 1].label) {
				this.scaleParts.push({
					label: scaleMajor,
					items: [],
				});
			}

			this.scaleParts[this.scaleParts.length - 1].items.push(scaleMinor);

		} while(date < this.gantt.endDate);
	}

	renderScale() {
		emptyElement(this.element);

		let offsetLeft = 0;
		let offsetTop  = 0;

		this.scaleParts.forEach(function(major, majorIndex) {
			const majorGroup = svg('g', {
				appendTo:  this.element,
			});

			svg('text', {
				'innerHTML': major.label,
				'appendTo':  majorGroup,
				'x':         offsetLeft,
				'y':         offsetTop,
				'height':    this.gantt.CELL_HEIGHT,
			});

			major.items.forEach(function(minor, minorIndex) {
				const minorGroup = svg('g', {
					'appendTo': majorGroup,
				});

				svg('text', {
					'innerHTML': minor,
					'appendTo':  minorGroup,
					'x':         offsetLeft + (minorIndex * this.gantt.CELL_WIDTH),
					'y':         offsetTop + this.gantt.CELL_HEIGHT,
					'width':     this.gantt.CELL_WIDTH,
					'height':    this.gantt.CELL_HEIGHT,
				});
			}, this);

			offsetLeft += major.items.length * this.gantt.CELL_WIDTH;
		}, this);
	}
}

class GanttTasks {
	constructor(gantt) {
		this.gantt = gantt;

		this.element = svg('g', {
			'class':    'gantt-tasks',
			'appendTo': this.gantt.svg,
		});

		this.tasks = [];

		this.tasks.push({
			label: 'BBQ with Ben',
			subtasks: [ // TODO: Need to sort these into the right order when they're added
				{
					start: new Date('2018-11-09 18:00:00'),
					end:   new Date('2018-11-09 18:30:00'),
					label: 'Get gas bottle back from Mum',
				},
				{
					start: new Date('2018-11-09 18:45:00'),
					end:   new Date('2018-11-09 19:30:00'),
					label: 'Get food from supermarket',
				},
				{
					start: new Date('2018-11-10 11:30:00'),
					end:   new Date('2018-11-10 17:30:00'),
					label: 'BBQ time!!',
				},
			],
		});
	}

	update() {
		this.renderTasks();
	}

	renderTasks() {
		emptyElement(this.element);

		let offsetLeft = 0;
		let offsetTop  = this.gantt.CELL_HEIGHT * 2;

		this.tasks.forEach(function(task, taskIndex) {
			const bar = svg('g', {
				'appendTo': this.element,
			});

			const firstTask = task.subtasks[0];
			const lastTask  = task.subtasks[task.subtasks.length - 1];

			const taskOffsetTop  = offsetTop + (taskIndex * this.gantt.CELL_HEIGHT);
			const taskOffsetLeft = offsetLeft + (this.gantt.calculateScaleUnits(this.gantt.startDate, firstTask.start) * this.gantt.CELL_WIDTH);

			svg('rect', {
				'appendTo':    bar,
				'x':           taskOffsetLeft,
				'y':           taskOffsetTop,
				'width':       this.gantt.calculateScaleUnits(firstTask.start, lastTask.end) * this.gantt.CELL_WIDTH,
				'height':      this.gantt.CELL_HEIGHT,
				'fill':        '#000000',
				'fill-opacity': 0.1,
			});

			svg('text', {
				'innerHTML': task.label,
				'appendTo':  bar,
				'x':         taskOffsetLeft + 2,
				'y':         taskOffsetTop + 2,
			});

			task.subtasks.forEach(function(subtask) {
				const subtaskOffsetLeft = taskOffsetLeft + (this.gantt.calculateScaleUnits(firstTask.start, subtask.start) * this.gantt.CELL_WIDTH);
				const subtaskOffsetTop  = taskOffsetTop + (this.gantt.CELL_HEIGHT / 2);

				svg('rect', {
					'appendTo':     bar,
					'x':            subtaskOffsetLeft + 2,
					'y':            subtaskOffsetTop + 2,
					'width':        (this.gantt.calculateScaleUnits(subtask.start, subtask.end) * this.gantt.CELL_WIDTH) - 4,
					'height':       (this.gantt.CELL_HEIGHT / 2) - 4,
					'fill':        '#000000',
					'fill-opacity': 0.1,
				});
			}, this);
		}, this);
	}
}