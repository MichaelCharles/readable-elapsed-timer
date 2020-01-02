"use strict";
exports.__esModule = true;
var lang_1 = require("./lang");
var Timer = /** @class */ (function () {
    function Timer(options) {
        if (options === void 0) { options = {
            start: Date.now(),
            brief: false,
            language: 'en'
        }; }
        var start = options.start, brief = options.brief, language = options.language;
        this.start = start || Date.now();
        this.brief = brief || false;
        this.language = language || 'en';
        this.translate = this.translate.bind(this);
    }
    Timer.prototype.getReadable = function (miliseconds, options) {
        if (options === void 0) { options = { brief: this.brief }; }
        var translate = this.translate;
        var brief = options.brief;
        var seconds = miliseconds / 1000;
        var useSpace = options.brief;
        if (seconds < 1) {
            return "" + parseFloat(miliseconds.toFixed(2)) + (brief ? translate('ms') : miliseconds === 1 ? translate('milisecond', useSpace) : translate('miliseconds', useSpace));
        }
        var minutes = miliseconds / 1000 / 60;
        if (minutes < 1) {
            return "" + parseFloat(seconds.toFixed(2)) + (brief ? translate('s', useSpace) : seconds === 1 ? translate('second', useSpace) : translate('seconds', useSpace));
        }
        var hours = miliseconds / 1000 / 60 / 60;
        if (hours < 1) {
            return "" + parseFloat(minutes.toFixed(2)) + (brief ? translate('m', useSpace) : minutes === 1 ? translate('minute', useSpace) : translate('minutes', useSpace));
        }
        return "" + parseFloat(hours.toFixed(2)) + (brief ? translate('h', useSpace) : hours === 1 ? translate('hour', useSpace) : translate('hours', useSpace));
    };
    Timer.prototype.reset = function (options) {
        if (options === void 0) { options = {
            start: Date.now(),
            brief: false
        }; }
        this.start = options.start;
        this.brief = options.brief;
    };
    Timer.prototype.elapsed = function (options) {
        if (options === void 0) { options = { start: this.start, end: Date.now(), brief: this.brief }; }
        return this.getReadable(this.elapsedRaw(options), { brief: (options.brief || this.brief) });
    };
    Timer.prototype.elapsedVerbose = function (options) {
        if (options === void 0) { options = { start: this.start, end: Date.now() }; }
        return this.getReadable(this.elapsedRaw(options), { brief: false });
    };
    Timer.prototype.elapsedBrief = function (options) {
        if (options === void 0) { options = { start: this.start, end: Date.now() }; }
        return this.getReadable(this.elapsedRaw(options), { brief: true });
    };
    Timer.prototype.elapsedRaw = function (options) {
        if (options === void 0) { options = { start: this.start, end: Date.now() }; }
        return (options.end || Date.now()) - (options.start || this.start);
    };
    Timer.prototype.translate = function (phrase, useSpace) {
        if (useSpace === void 0) { useSpace = this.brief; }
        var _ = useSpace ? lang_1["default"][this.language].briefSpace ? " " : "" : lang_1["default"][this.language].verboseSpace ? " " : "";
        return "" + _ + lang_1["default"][this.language][phrase];
    };
    return Timer;
}());
module.exports = Timer;
