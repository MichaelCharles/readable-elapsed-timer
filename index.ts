interface moduleOptions {
	start?: number,
	brief?: boolean,
}

interface elapsedOptions {
	start?: number,
	end?: number,
	brief?: boolean
}

class Timer {
	start: number
	brief: boolean

	constructor(options: moduleOptions = {
		start: new Date().getTime(),
		brief: false
	}) {
		this.start = options.start
		this.brief = options.brief
	}

	getReadable(miliseconds, options: moduleOptions = { brief: this.brief }) {
		const { brief } = options
		const seconds = miliseconds / 1000

		if (seconds < 1) {
			return `${parseFloat(miliseconds.toFixed(2))}${
				brief ? 'ms' : miliseconds === 1 ? ' milisecond' : ' miliseconds'
				}`
		}

		const minutes = miliseconds / 1000 / 60

		if (minutes < 1) {
			return `${parseFloat(seconds.toFixed(2))}${brief ? 's' : seconds === 1 ? ' second' : ' seconds'}`
		}

		const hours = miliseconds / 1000 / 60 / 60

		if (hours < 1) {
			return `${parseFloat(minutes.toFixed(2))}${brief ? 'm' : minutes === 1 ? ' minute' : ' minutes'}`
		}

		return `${parseFloat(hours.toFixed(2))}${brief ? 'h' : hours === 1 ? ' hour' : ' hours'}`
	}

	reset(options: moduleOptions = {
		start: new Date().getTime(),
		brief: false
	}) {
		this.start = options.start
		this.brief = options.brief
	}

	elapsed(options: elapsedOptions = { start: this.start, end: new Date().getTime(), brief: this.brief }) {
		return this.getReadable(this.elapsedRaw(options), { brief: (options.brief || this.brief) })
	}

	elapsedVerbose(options: elapsedOptions = { start: this.start, end: new Date().getTime() }) {
		return this.getReadable(this.elapsedRaw(options), { brief: false })
	}

	elapsedBrief(options: elapsedOptions = { start: this.start, end: new Date().getTime() }) {
		return this.getReadable(this.elapsedRaw(options), { brief: true })
	}

	elapsedRaw(options: elapsedOptions = { start: this.start, end: new Date().getTime() }) {
		return (options.end || new Date().getTime()) - (options.start || this.start)
	}
}

module.exports = Timer