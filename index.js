var Timer = /** @class */ (function () {
    function Timer(options) {
        if (options === void 0) { options = {
            start: new Date().getTime(),
            brief: false
        }; }
        this.start = options.start;
        this.brief = options.brief;
    }
    Timer.prototype.getReadable = function (miliseconds, options) {
        if (options === void 0) { options = { brief: this.brief }; }
        var brief = options.brief;
        var seconds = miliseconds / 1000;
        if (seconds < 1) {
            return "" + parseFloat(miliseconds.toFixed(2)) + (brief ? 'ms' : miliseconds === 1 ? ' milisecond' : ' miliseconds');
        }
        var minutes = miliseconds / 1000 / 60;
        if (minutes < 1) {
            return "" + parseFloat(seconds.toFixed(2)) + (brief ? 's' : seconds === 1 ? ' second' : ' seconds');
        }
        var hours = miliseconds / 1000 / 60 / 60;
        if (hours < 1) {
            return "" + parseFloat(minutes.toFixed(2)) + (brief ? 'm' : minutes === 1 ? ' minute' : ' minutes');
        }
        return "" + parseFloat(hours.toFixed(2)) + (brief ? 'h' : hours === 1 ? ' hour' : ' hours');
    };
    Timer.prototype.reset = function (options) {
        if (options === void 0) { options = {
            start: new Date().getTime(),
            brief: false
        }; }
        this.start = options.start;
        this.brief = options.brief;
    };
    Timer.prototype.elapsed = function (options) {
        if (options === void 0) { options = { start: this.start, end: new Date().getTime() }; }
        return this.getReadable(this.elapsedRaw(options), { brief: this.brief });
    };
    Timer.prototype.elapsedVerbose = function (options) {
        if (options === void 0) { options = { start: this.start, end: new Date().getTime() }; }
        return this.getReadable(this.elapsedRaw(options), { brief: false });
    };
    Timer.prototype.elapsedBrief = function (options) {
        if (options === void 0) { options = { start: this.start, end: new Date().getTime() }; }
        return this.getReadable(this.elapsedRaw(options), { brief: true });
    };
    Timer.prototype.elapsedRaw = function (options) {
        if (options === void 0) { options = { start: this.start, end: new Date().getTime() }; }
        return (options.end || new Date().getTime()) - (options.start || this.start);
    };
    return Timer;
}());
module.exports = Timer;
