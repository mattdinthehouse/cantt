class Gantt {
	constructor(container) {
		this.CELL_WIDTH  = 32;
		this.CELL_HEIGHT = 32;

		this.startDate = new Date('2018-10-01 00:00:00');
		this.endDate   = new Date('2019-01-31 23:59:59');

		this.scale = 'Days';

		this.updateScaleParts();

		this.createElements(container);

		this.renderScale();

		console.log(this);
	}

	updateScaleParts() {
		this.scaleParts  = [];

		let scaleMajor = undefined;
		let scaleMinor = undefined;

		const date = new Date(this.startDate.getTime());

		do {
			switch(this.scale) {
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

		} while(date < this.endDate);
	}

	createElements(container) {
		this.svg = svg('svg', {
			class:    'gantt',
			appendTo: container,
			width:    this.calculateScaleUnits(this.startDate, this.endDate) * this.CELL_WIDTH,
			height:   500,
		});

		this.layers = {};
		
		this.layers.scale = svg('g', {
			class:    'gantt-scale',
			appendTo: this.svg,
		});
		
		this.layers.tasks = svg('g', {
			class:    'gantt-tasks',
			appendTo: this.svg,
		});
	}

	renderScale() {
		let offsetLeft = 0;
		let offsetTop  = this.CELL_HEIGHT * 0.5;

		this.scaleParts.forEach(function(major, majorIndex) {
			const majorGroup = svg('g', {
				appendTo:  this.layers.scale,
			});

			svg('text', {
				innerHTML: major.label,
				appendTo:  majorGroup,
				x:         offsetLeft,
				y:         offsetTop,
				height:    this.CELL_HEIGHT,
			});

			major.items.forEach(function(minor, minorIndex) {
				const minorGroup = svg('g', {
					appendTo: majorGroup,
				});

				svg('text', {
					innerHTML: minor,
					appendTo:  minorGroup,
					x:         offsetLeft + (minorIndex * this.CELL_WIDTH),
					y:         offsetTop + this.CELL_HEIGHT,
					width:     this.CELL_WIDTH,
					height:    this.CELL_HEIGHT,
				});
			}, this);

			offsetLeft += major.items.length * this.CELL_WIDTH;
		}, this);
	}

	calculateScaleUnits(start, end) {
		let units = 0;

		switch(this.scale) {
			case 'Hours':
				units = (end.getTime() - start.getTime()) / 1000 / 60 / 60;
				break;

			case 'Days':
				units = (end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24;
				break;
		}

		return units.toFixed(0);
	}
}