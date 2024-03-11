interface DummyResponse {
  body: string;
};
function dummyFetch(target: string): Promise<DummyResponse> {
  return new Promise((resolve, reject) => {
    console.log("Promise constructor executing...", resolve, reject);
    // 非同期に、ランダムな時間で履行か拒否をする
    setTimeout(() => {
      // success で始まるならresolveする
      if (target.startsWith("/success")) {
        resolve({ body: `Response body of ${target}` });
      } else {
        reject(new Error("Target not found."));
      }
    }, 1000 + 1000 * Math.random());
  });
}

export { DummyResponse, dummyFetch };
