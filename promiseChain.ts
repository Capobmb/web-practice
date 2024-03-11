// Promise chain
Promise.resolve()
  .then(() => console.log("step 1."))
  .then(() => console.log("step 2."));

type Point = {
  x: number;
  y: number;
};

const onFulfilled1 = ({ x, y }: Point) => {
  console.log(`step 1, x = ${x}`);
  return y;
};
const onFulfilled2 = (y: number) => {
  console.log(`step 2, y = ${y}`);
};
Promise.resolve({ x: 3, y: 4 }).then(onFulfilled1).then(onFulfilled2);

// これは以下と同値
const step0 = Promise.resolve({ x: 3, y: 4 });
const afterStep1 = step0.then(onFulfilled1);
const afterStep2 = afterStep1.then(onFulfilled2);

/* ここまでのoutput例:
step 1.
step 1, x = 3
step 1, x = 3
step 2.
step 2, y = 4
step 2, y = 4
// 非同期に実行される！！
*/

// Error が発生した場合、PromiseオブジェクトはRejected状態になりreject が呼ばれる
Promise.resolve(42)
  .then((value) => {
    const errorVal = value / 0;
    if (errorVal === Infinity)
      throw new Error("omg. イニフィニティーエラー！？");
    console.log("success ^^");
  })
  .then(() => {
    // ここは実行されない
    console.log(
      "What's !?!? Why ゼロ除算ピーポー！？！？ エラー起こるでしょ！？！？"
    );
  })
  // 代わりにこっちが実行される
  .catch((error) => console.error(error.message))
  .then(() => console.log("エラーが処理されてFulfilled になったなあ。"));

// 型が合ってないときどうなるんだ？
Promise.resolve(19)
  .then((value) => {
    if (value == 19) throw new Error("イク");
    return 1919;
  })
  .then(
    // ここは実際には実行されん
    (value) => {
      console.log("value is " + value);
    },
    // こっちが実行される
    (error) => console.log(error - 3)
    // output: NaN
  );

// コールバックでRejectedなPromiseを返すことでRejected 状態を維持する
Promise.reject()
  .catch((error) => {
    console.log(error.message);
    return Promise.reject(error);
  })
  .then(() => {
    console.log("ここは実行されません");
  })
  .catch((error) => {
    console.log("caught error.");
  });
