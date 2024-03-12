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

    // 普通にresolve したらどうなる？
    // ここの実行もresolve のアタッチまで待たれる。
    resolve();
  });

  blockFor(1000);

  console.log("some synchronous executions", Date.now());

  blockFor(1000);

  promise.then(() => {
    console.log("inside resolve.", Date.now());
  });
}

main();

/* Output:
inside constructor. 1710216563358
inside constructor after 1000 ms 1710216564359
some synchronous executions 1710216565359
inside resolve. 1710216566359
 */