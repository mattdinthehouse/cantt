class Gantt {
	constructor(container) {
		this.CELL_WIDTH  = 32;
		this.CELL_HEIGHT = 32;

		this.startDate = new Date('2018-11-09 00:00:00');
		this.endDate   = new Date('2019-01-31 23:59:59');

		this.scaleType = 'Hours';

		this.svg = svg('svg', {
			'class':    'gantt',
			'appendTo': container,
			'width':    this.calculateScaleUnits(this.startDate, this.endDate) * this.CELL_WIDTH,
			'height':   500,
		});

		this.scale = new GanttScale(this);

		this.tasks = new GanttTaskList(this);

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

class GanttTaskList {
	constructor(gantt) {
		this.gantt = gantt;

		this.element = svg('g', {
			'class':    'gantt-tasks',
			'appendTo': this.gantt.svg,
		});

		this.tasks = [];

		this.tasks.push(new GanttTask(this.gantt, {
			startDate: new Date('2018-11-09 18:00:00'),
			endDate:   new Date('2018-11-10 17:30:00'),
			label:     'BBQ with Ben',
			subtasks:  [
				new GanttTask(this.gantt, {
					startDate: new Date('2018-11-09 18:00:00'),
					endDate:   new Date('2018-11-09 19:30:00'),
					label:     'Get stuff',
					subtasks:  [
						new GanttTask(this.gantt, {
							startDate: new Date('2018-11-09 18:00:00'),
							endDate:   new Date('2018-11-09 18:30:00'),
							label:     'Get gas bottle from mum',
							subtasks:  [
							],
						}),
						new GanttTask(this.gantt, {
							startDate: new Date('2018-11-09 18:45:00'),
							endDate:   new Date('2018-11-09 19:30:00'),
							label:     'Get food from supermarket',
							subtasks:  [
							],
						}),
					],
				}),
				new GanttTask(this.gantt, {
					startDate: new Date('2018-11-10 11:30:00'),
					endDate:   new Date('2018-11-10 17:30:00'),
					label:     'BBQ time!!',
					subtasks:  [
					],
				}),
			],
		}));
	}

	update() {
		this.renderTasks();

		this.tasks.forEach(function(task) {
			task.update();
		});
	}

	renderTasks() {
		emptyElement(this.element);

		let offsetLeft = 0;
		let offsetTop  = this.gantt.CELL_HEIGHT * 2;

		this.tasks.forEach(function(task) {
			task.render(this.element, 0, offsetLeft, offsetTop);
		}, this);
	}
}

class GanttTask {
	constructor(gantt, data) {
		this.gantt = gantt;

		Object.entries(data).forEach(function(datum) {
			this[datum[0]] = datum[1];
		}, this);
	}

	update() {
		this.subtasks.forEach(function(subtask) {
			subtask.update();
		});
	}

	render(element, depth, offsetLeft, offsetTop) {
		const indent = 3;

		const x = offsetLeft + (this.gantt.calculateScaleUnits(this.gantt.startDate, this.startDate) * this.gantt.CELL_WIDTH);
		const y = offsetTop;

		let width  = this.gantt.calculateScaleUnits(this.startDate, this.endDate) * this.gantt.CELL_WIDTH;
		let height = this.gantt.CELL_HEIGHT;

		if(depth == 1) {
			// Ensure the first level's subtasks are at least visible so the user can see they exist
			width = Math.max(width, ((indent * 2) + 2));
		}

		svg('rect', {
			'appendTo':       element,
			'x':              x + (depth * indent),
			'y':              offsetTop + (depth * indent),
			'width':          width - (depth * (indent * 2)),
			'height':         this.gantt.CELL_HEIGHT - (depth * (indent * 2)),
			'fill':           'black',
			'fill-opacity':   0.08,
		});

		if(depth == 0 || width > (depth * (indent * 2))) {
			// Maybe render subtasks if it's the first level or there's enough space
			if(this.subtasks.length) {
				const subtasksElement = svg('g', {
					'appendTo': element,
				});

				this.subtasks.forEach(function(subtask) {
					subtask.render(subtasksElement, depth + 1, offsetLeft, offsetTop);
				});
			}
		}
	}
}