import { DummyResponse, dummyFetch } from "./dummyFetch";

// 逐次的に非同期処理
const responses: DummyResponse["body"][] = [];
dummyFetch("/success/1")
  .then((response) => {
    responses.push(response.body);
    // 続けて逐次的に非同期処理を行う
    return dummyFetch("/success/2");
  })
  .then((response) => {
    responses.push(response.body);
  })
  .then(() => console.log(responses));

// Promise.all で同時に非同期処理
let fetchTargets: DummyResponse["body"][];
let fetchedPromises: Promise<DummyResponse[]>;
const successFetchTargets = ["/success/1", "/success/2", "/success/3"];
const failureFetchTargets = ["/success/1", "/failure/4"];
// 成功するバージョン
fetchTargets = successFetchTargets;
fetchedPromises = Promise.all(fetchTargets.map((target) => dummyFetch(target)));
fetchedPromises.then(console.log);

// 失敗するバージョン
fetchTargets = failureFetchTargets;
fetchedPromises = Promise.all(fetchTargets.map((target) => dummyFetch(target)));
fetchedPromises.then(console.log, (error) => console.error(error.message));

// Promise.race で一番最初にSettled になったPromise の状態を"継承"する
fetchTargets = successFetchTargets;
const racePromise = Promise.race(fetchTargets);
racePromise.then((value) => console.log(value));

// Promise.race を応用して、タイムアウトを実装
Promise.race([
  dummyFetch("/success/12"),
  new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("1100 milliseconds passed. timeout."));
    }, 1100);
  }),
])
  .then((response) => console.log(response))
  .catch((error) => console.error(error.message));
