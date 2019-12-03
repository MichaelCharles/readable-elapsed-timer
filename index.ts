class Timer {
	start: number
	brief: boolean
	
	constructor() {
		this.start = new Date().getTime()
		this.brief = false

		this.getReadable = this.getReadable.bind(this)
		this.elapsedRaw = this.elapsedRaw.bind(this)
	}

	getReadable(miliseconds) {
		const { brief } = this
		const seconds = miliseconds / 1000

		if (seconds < 1) {
			return `${miliseconds.toFixed(2)}${
				brief ? 'ms' : miliseconds === 1 ? ' milisecond' : ' miliseconds'
			}`
		}

		const minutes = miliseconds / 1000 / 60

		if (minutes < 1) {
			return `${seconds.toFixed(2)}${brief ? 's' : seconds === 1 ? ' second' : ' seconds'}`
		}

		const hours = miliseconds / 1000 / 60 / 60

		if (hours < 1) {
			return `${minutes.toFixed(2)}${brief ? 'm' : minutes === 1 ? ' minute' : ' minutes'}`
		}

		return `${hours.toFixed(2)}${brief ? 'h' : hours === 1 ? ' hour' : ' hours'}`
	}

	reset() {
		this.start = new Date().getTime()
	}

	elapsed() {
		this.brief = false
		return this.getReadable(this.elapsedRaw())
	}

	elapsedBrief() {
		this.brief = true
		return this.getReadable(this.elapsedRaw())
	}

	elapsedRaw() {
		return new Date().getTime() - this.start
	}
}

export default Timer