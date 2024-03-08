function dummyFetch(target: string) {
  return new Promise((resolve, reject) => {
    console.log("Promise constructor executing...", resolve, reject);
    // ランダムな時間で履行か拒否をする
    setTimeout(() => {
      // success で始まるならresolveする
      if (target.startsWith("/success")) {
        resolve({ body: `Response body of ${target}` });
      } else {
        reject(new Error("Target not found."));
      }
    }, 1000 * Math.random());
  });
}

dummyFetch("/success/foo")
  .then(
    (response) => console.log(response),
    (error) => console.error(error)
  )
  // resolve されたら こいつの型は Promise<void> になる
  .then((response) => console.log(response));

dummyFetch("/failure/bar").then(undefined, (err) => console.error(err));
