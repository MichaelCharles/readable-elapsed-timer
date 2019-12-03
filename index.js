"use strict";
exports.__esModule = true;
var Timer = /** @class */ (function () {
    function Timer() {
        this.start = new Date().getTime();
        this.brief = false;
        this.getReadable = this.getReadable.bind(this);
        this.elapsedRaw = this.elapsedRaw.bind(this);
    }
    Timer.prototype.getReadable = function (miliseconds) {
        var brief = this.brief;
        var seconds = miliseconds / 1000;
        if (seconds < 1) {
            return "" + miliseconds.toFixed(2) + (brief ? 'ms' : miliseconds === 1 ? ' milisecond' : ' miliseconds');
        }
        var minutes = miliseconds / 1000 / 60;
        if (minutes < 1) {
            return "" + seconds.toFixed(2) + (brief ? 's' : seconds === 1 ? ' second' : ' seconds');
        }
        var hours = miliseconds / 1000 / 60 / 60;
        if (hours < 1) {
            return "" + minutes.toFixed(2) + (brief ? 'm' : minutes === 1 ? ' minute' : ' minutes');
        }
        return "" + hours.toFixed(2) + (brief ? 'h' : hours === 1 ? ' hour' : ' hours');
    };
    Timer.prototype.reset = function () {
        this.start = new Date().getTime();
    };
    Timer.prototype.elapsed = function () {
        this.brief = false;
        return this.getReadable(this.elapsedRaw());
    };
    Timer.prototype.elapsedBrief = function () {
        this.brief = true;
        return this.getReadable(this.elapsedRaw());
    };
    Timer.prototype.elapsedRaw = function () {
        return new Date().getTime() - this.start;
    };
    return Timer;
}());
exports["default"] = Timer;
