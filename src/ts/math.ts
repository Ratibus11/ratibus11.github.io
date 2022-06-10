function toRad(degrees: number) {
	return (degrees * Math.PI) / 180;
}

function scale(
	number: number,
	inMin: number,
	inMax: number,
	outMin: number,
	outMax: number
) {
	return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export { toRad, scale };
