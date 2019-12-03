const Timer = require("./index.js");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

test(`returns a 500 ms delay as '500 miliseconds'.`, async () => {
  const timer = new Timer();
  await delay(500);
  const elapsed = timer.elapsed();
  const number = parseInt(elapsed.split(" ")[0]);
  const unit = elapsed.split(" ")[1];
  expect(`${number > 450 && number < 550 ? "500" : number} ${unit}`).toBe(
    "500 miliseconds"
  );
});

test(`can convert 60000 miliseconds into '1 minute'.`, () => {
  const timer = new Timer();
  const elapsed = timer.getReadable(60000);
  expect(elapsed).toBe("1 minute");
});

test(`can convert 3600000 miliseconds into '1 hour'.`, () => {
  const timer = new Timer();
  const elapsed = timer.getReadable(3600000);
  expect(elapsed).toBe("1 hour");
});

test(`can init with options to show brief readable time`, () => {
  const timer = new Timer({
    brief: true
  });
  const elapsed = timer.getReadable(5000);
  expect(elapsed).toBe("5s");
});

test(`can output elapsed raw as over 9000 (笑)`, () => {
  const timer = new Timer({
    start: new Date().getTime() - 10000
  });
  const elapsed = timer.elapsedRaw();
  expect(elapsed).toBeGreaterThan(9000);
});

test(`can compare arbitrary times by using options`, () => {
  const now = new Date().getTime();
  const timer = new Timer({
    start: now - 10000
  });
  const elapsed = timer.elapsedRaw({ end: now + 10000 });
  expect(elapsed).toBe(20000);
});

test(`can compare arbitrary times by setting start and end in elapsedRaw only`, () => {
  const timer = new Timer({
    brief: true
  });
  const now = new Date().getTime();
  const elapsed = timer.elapsed({
    start: now - 10000,
    end: now + 10000
  });
  expect(elapsed).toBe('20s');
});
