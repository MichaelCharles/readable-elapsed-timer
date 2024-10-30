import lang from "../lang";

type supportedLanguages = "en" | "ja";
type validPhrases =
  | " "
  | "ms"
  | "s"
  | "m"
  | "h"
  | "milisecond"
  | "miliseconds"
  | "second"
  | "seconds"
  | "minute"
  | "minutes"
  | "hour"
  | "hours";

interface IModuleOptions {
  start?: number;
  brief?: boolean;
  language?: supportedLanguages;
}

interface IElapsedOptions {
  start?: number;
  end?: number;
  brief?: boolean;
}

class Timer {
  start: number;
  brief: boolean;
  language: supportedLanguages;

  constructor(
    options: IModuleOptions = {
      start: Date.now(),
      brief: false,
      language: "en",
    }
  ) {
    const { start, brief, language } = options;
    this.start = start || Date.now();
    this.brief = brief || false;
    this.language = language || "en";

    this.translate = this.translate.bind(this);
  }

  getReadable(miliseconds, options: IModuleOptions = { brief: this.brief }) {
    const { translate } = this;
    const { brief } = options;
    const seconds = miliseconds / 1000;
    const useSpace = options.brief;

    if (seconds < 1) {
      return `${parseFloat(miliseconds.toFixed(2))}${
        brief
          ? translate("ms")
          : miliseconds === 1
          ? translate("milisecond", useSpace)
          : translate("miliseconds", useSpace)
      }`;
    }

    const minutes = miliseconds / 1000 / 60;

    if (minutes < 1) {
      return `${parseFloat(seconds.toFixed(2))}${
        brief
          ? translate("s", useSpace)
          : seconds === 1
          ? translate("second", useSpace)
          : translate("seconds", useSpace)
      }`;
    }

    const hours = miliseconds / 1000 / 60 / 60;

    if (hours < 1) {
      return `${parseFloat(minutes.toFixed(2))}${
        brief
          ? translate("m", useSpace)
          : minutes === 1
          ? translate("minute", useSpace)
          : translate("minutes", useSpace)
      }`;
    }

    return `${parseFloat(hours.toFixed(2))}${
      brief
        ? translate("h", useSpace)
        : hours === 1
        ? translate("hour", useSpace)
        : translate("hours", useSpace)
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

  translate(phrase: validPhrases, useSpace = this.brief) {
    const _ = useSpace
      ? lang[this.language].briefSpace
        ? " "
        : ""
      : lang[this.language].verboseSpace
      ? " "
      : "";
    return `${_}${lang[this.language][phrase]}`;
  }
}

export { Timer };
export default Timer;
