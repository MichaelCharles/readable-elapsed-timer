![](./coverage/badge-lines.svg) ![](./coverage/badge-functions.svg) ![](./coverage/badge-branches.svg) ![](./coverage/badge-statements.svg)

# Readable Elapsed Timer

A tool for easily finding the time elapsed between two parts of your code.

## Usage

Import the `Timer` class at the top of your file. If your project uses ES6 modules then do the following.

```
import { Timer } from "readable-elapsed-timer";
```

If your poject uses CommonJS modules, then do the following.

```
const { Timer } = require('readable-elapsed-timer')
```

Then you can create a new timer object to keep track of time within your code. Call the `elapsed()` method to return the time elapsed in a human readable format. To get the time between two different points without creating a new timer object, simply call the `reset()` method.

```
// Delay function for demonstration purposes.
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const timer = new Timer();
  await delay(100);
  console.log(timer.elapsed());
  // "100 milliseconds"

  timer.reset()
  await delay(500);
  console.log(timer.elapsed());
  // "500 milliseconds"

  await delay(1000);
  console.log(timer.elapsed());
  // "1.5 seconds"
  // Notice we didn't reset the timer this time.
};

main()
```

## Install

```
npm install readable-elapsed-time
```

## Advanced Usage

The constructor accepts an `options` object as an argument.

```
const options = {
    start: new Date('November 5, 1955').getTime(),
    brief: true,
    language: 'ja'  // Supports 'en' (default) or 'ja' for Japanese output
}
```

All of the `elapsed` family of methods accept an `options` argument as well. In addition to the options available on the constructor, you can set an `end` time. This allows you to get time elapsed without actually needing to wait.

```
const options = {
    start: new Date("November 5, 1955").getTime(),
    end: new Date("October 21, 2015").getTime(),
    brief: false
};

const elapsed = timer.elapsed(options);

console.log(elapsed);
// "525600 hours"
```

Setting `start` allows you to give the timer instance an arbitrary start time. Setting `brief` changes the default function of the timer instance to show time formatted as abbreviations ("5s" instead of "5 seconds"). Setting `language` to "ja" will output times in Japanese format (e.g., "5秒" instead of "5 seconds").

The following additional methods are available on an instance of `Timer`.

- `elapsedVerbose()` This will return the time elapsed formatted to be human readable even if the timer is configured otherwise. If `timer.elapsedVerbose()` is called after five seconds, `5 seconds` will be returned.
- `elapsedBrief()` This will return the time elapsed formatted using abbreviations even if the timer is configured otherwise. If `timer.elapsedBrief()` is called after five seconds, `5s` will be returned.
- `elapsedRaw()` This will return the time elapsed in milliseconds without any additional formatting. If `timer.elapsedRaw()` is called after five seconds, `5000` will be returned.
- `elapsedRaw()` This will return the time elapsed in milliseconds without any additional formatting. If `timer.elapsedRaw()` is called after five seconds, `5000` will be returned.

# Releases

* 0.3.1 - Added two more tests for the undocumented language feature. Updated dependencies.
* 0.4.0 - Added documentation for Japanese language support. Timer can now output elapsed time in Japanese format when initialized with `language: "ja"` option.
* 0.4.2 - Fixed issues with type declarations. You should be able to more easily import this library now.