/*
* Do all things geomery-related
*/

const boxArea = (w, h) => {
	return w * h
}

const boxCircumference = (w, h) => w * 2 + h * 2;

// Export
module.exports = {
	boxArea,
	boxCircumference,
}
