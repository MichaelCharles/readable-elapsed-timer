const TestTimer = require('./index')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test(`returns a 500 ms delay as '500 miliseconds'.`, async () => {
  const timer = new TestTimer();
  await delay(500);
  const elapsed = timer.elapsed();
  const number = parseInt(elapsed.split(" ")[0]);
  const unit = elapsed.split(" ")[1];
  expect(`${number > 450 && number < 550 ? "500" : number} ${unit}`).toBe(
    "500 miliseconds"
  );
});

test(`can convert 60000 miliseconds into '1 minute'.`, () => {
  const timer = new TestTimer();
  const elapsed = timer.getReadable(60000);
  expect(elapsed).toBe("1 minute");
});

test(`can use elapsedBrief to convert 60000 miliseconds into '1m'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedBrief({
    start: now - 60000,
    end: now
  });
  expect(elapsed).toBe("1m");
});

test(`1 milisecond into '1 milisecond'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 1,
    end: now
  });
  expect(elapsed).toBe("1 milisecond");
});

test(`2 miliseconds into '2 miliseconds'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 2,
    end: now
  });
  expect(elapsed).toBe("2 miliseconds");
});

test(`60000 miliseconds into '1 minute'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 60000,
    end: now
  });
  expect(elapsed).toBe("1 minute");
});

test(`120000 miliseconds into '2 minutes'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 120000,
    end: now
  });
  expect(elapsed).toBe("2 minutes");
});

test(`1000 miliseconds into '1 second'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 1000,
    end: now
  });
  expect(elapsed).toBe("1 second");
});

test(`2000 miliseconds into '2 seconds'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 2000,
    end: now
  });
  expect(elapsed).toBe("2 seconds");
});

test(`3600000 miliseconds into '1 hour'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 3600000,
    end: now
  });
  expect(elapsed).toBe("1 hour");
});

test(`7200000 miliseconds into '2 hours'.`, () => {
  const timer = new TestTimer();
  const now = new Date().getTime();
  const elapsed = timer.elapsedVerbose({
    start: now - 7200000,
    end: now
  });
  expect(elapsed).toBe("2 hours");
});

test(`can set brief to true on reset`, () => {
  const timer = new TestTimer();
  timer.reset({
    brief: true
  });
  expect(timer.brief).toBe(true);
});

test(`can reset without options`, async () => {
  const timer = new TestTimer();
  const firstStart = timer.start
  await delay(100)
  timer.reset();
  const secondStart = timer.start
  expect(firstStart === secondStart).toBeFalsy();
});

test(`can set start time on reset`, () => {
  const thePast = new Date("September 2, 1885").getTime();
  const timer = new TestTimer();
  timer.reset({
    start: thePast,
    brief: false
  });
  expect(timer.start).toBe(thePast);
});

test(`can convert 3600000 miliseconds into '1 hour'.`, () => {
  const timer = new TestTimer();
  const elapsed = timer.getReadable(3600000);
  expect(elapsed).toBe("1 hour");
});

test(`can init with options to show brief readable time`, () => {
  const timer = new TestTimer({
    brief: true
  });
  const elapsed = timer.getReadable(5000);
  expect(elapsed).toBe("5s");
});

test(`can output elapsed raw as over 9000 (笑)`, () => {
  const timer = new TestTimer({
    start: new Date().getTime() - 10000
  });
  const elapsed = timer.elapsedRaw();
  expect(elapsed).toBeGreaterThan(9000);
});

test(`can compare arbitrary times by using options`, () => {
  const now = new Date().getTime();
  const timer = new TestTimer({
    start: now - 10000
  });
  const elapsed = timer.elapsedRaw({ end: now + 10000 });
  expect(elapsed).toBe(20000);
});

test(`can compare arbitrary times by setting start and end in elapsedRaw only`, () => {
  const timer = new TestTimer({
    brief: true
  });
  const now = new Date().getTime();
  const elapsed = timer.elapsed({
    start: now - 10000,
    end: now + 10000
  });
  expect(elapsed).toBe("20s");
});
