interface IModuleOptions {
  start?: number;
  brief?: boolean;
}

interface IElapsedOptions {
  start?: number;
  end?: number;
  brief?: boolean;
}

class Timer {
  start: number;
  brief: boolean;

  constructor(
    options: IModuleOptions = {
      start: Date.now(),
      brief: false,
    }
  ) {
    const { start, brief } = options;
    this.start = start || Date.now();
    this.brief = brief || false;
  }

  getReadable(
    milliseconds: number,
    options: IModuleOptions = { brief: this.brief }
  ) {
    const { brief } = options;
    const seconds = milliseconds / 1000;

    if (seconds < 1) {
      return `${parseFloat(milliseconds.toFixed(2))}${
        brief ? "ms" : milliseconds === 1 ? " millisecond" : " milliseconds"
      }`;
    }

    const minutes = milliseconds / 1000 / 60;

    if (minutes < 1) {
      return `${parseFloat(seconds.toFixed(2))}${
        brief ? "s" : seconds === 1 ? " second" : " seconds"
      }`;
    }

    const hours = milliseconds / 1000 / 60 / 60;

    if (hours < 1) {
      return `${parseFloat(minutes.toFixed(2))}${
        brief ? "m" : minutes === 1 ? " minute" : " minutes"
      }`;
    }

    return `${parseFloat(hours.toFixed(2))}${
      brief ? "h" : hours === 1 ? " hour" : " hours"
    }`;
  }

  reset(
    options: IModuleOptions = {
      start: Date.now(),
      brief: false,
    }
  ) {
    this.start = options.start || Date.now();
    this.brief = options.brief || false;
  }

  elapsed(
    options: IElapsedOptions = {
      start: this.start,
      end: Date.now(),
      brief: this.brief,
    }
  ) {
    return this.getReadable(this.elapsedRaw(options), {
      brief: options.brief || this.brief,
    });
  }

  elapsedVerbose(
    options: IElapsedOptions = { start: this.start, end: Date.now() }
  ) {
    return this.getReadable(this.elapsedRaw(options), { brief: false });
  }

  elapsedBrief(
    options: IElapsedOptions = { start: this.start, end: Date.now() }
  ) {
    return this.getReadable(this.elapsedRaw(options), { brief: true });
  }

  elapsedRaw(
    options: IElapsedOptions = { start: this.start, end: Date.now() }
  ) {
    return (options.end || Date.now()) - (options.start || this.start);
  }
}

export { Timer };
export default Timer;
