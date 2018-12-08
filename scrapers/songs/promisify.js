const promiseQueue = require('js-promise-queue');

const factoryFn = value =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), 1000);
  });

promiseQueue([1, 2, 3], factoryFn).then(console.log);
