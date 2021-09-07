export function sleep(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

export function capitalizeFirstLetter(string) {
	return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}
