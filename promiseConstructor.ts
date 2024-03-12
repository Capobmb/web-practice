/*
いつPromise オブジェクトのコンストラクタは実行される？
 */

/**
 * @param time time to block main thread in millisecond
 */
function blockFor(time: number) {
  const start = Date.now();
  while (true) {
    if (Date.now() - start >= time) return;
  }
}

function main() {
  const promise = new Promise<void>((resolve, reject) => {
    console.log("inside constructor.", Date.now());
    blockFor(1000);
    console.log("inside constructor after 1000 ms", Date.now());

    setTimeout(() => {
      // resolve がアタッチされるタイミングか timeout が切れるタイミングの遅い方でこのスコープが実行される
      console.log("inside setTimeout", Date.now());
      resolve();
    }, 10);
  });

  blockFor(1000);

  console.log("some synchronous executions", Date.now());

  blockFor(1000);

  promise
    .then(() => {
      console.log("inside resolve.", Date.now());
    })
    .then(() => console.log("second inside resolve.", Date.now()));
}

main();

/* Output: 
inside constructor. 1710216428165
// （ここに blockForの一秒が入る）
inside constructor after 1000 ms 1710216429166
// （ここに blockForの一秒が入る）
some synchronous executions 1710216430166
// （ここに blockForの一秒が入る）
inside setTimeout 1710216431166
inside resolve. 1710216431167
second inside resolve. 1710216431167
 */