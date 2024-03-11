function throwPromise() {
  return new Promise((resolve, reject) => {
    throw new Error("例外でたあ"); 
    // エラーがthrowされると、Rejected 状態になり、reject 関数が実行される
    console.log("hoge"); // this is unreacheble
  });
}

throwPromise().catch((reason) => console.log(reason));
const a = throwPromise().catch((error) => console.log(error.message));
a.then((value) => console.log(value));
