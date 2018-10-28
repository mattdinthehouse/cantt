// Create an SVG DOM element
function svg(tag, attributes) {
	const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

	Object.entries(attributes).forEach(function(attr) {
		switch(attr[0]) {
			case 'appendTo':
				attr[1].appendChild(element);
				break;

			case 'innerHTML':
				element.innerHTML = attr[1];
				break;

			default:
				element.setAttribute(attr[0], attr[1]);
				break;
		}
	});

	return element;
}

// Get the month name out of a Date object
function dateMonthName(date) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return monthNames[date.getMonth()];
}

// Get the day name out of a Date object
function dateDayName(date) {
	const dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	return dayNames[date.getDay()];
}