// resolved なPromiseを作成（糖衣構文）
const promiseResolved1 = Promise.resolve();
// これは以下と同値
const hoge = new Promise<void>((resolve, _reject) => {
  resolve();
});
promiseResolved1.then(
  () => console.log("now Fulfilled!"),
  (reason) => console.log("now Rejected")
);

const promiseResolved2 = Promise.resolve(42);
// これは以下と同値
const fuga = new Promise((resolve, _reject) => {
  resolve(42);
});
promiseResolved2.then((value) => console.log(value));

// rejected なPromiseを作成
const promiseRejected1 = Promise.reject(new Error("おいエラー！！"));
promiseRejected1.catch((error) => console.log(error.message));
