// 同期処理: 
function async_example() {
    const header = document.getElementById('heading');
    header !== null && (header.innerHTML = 'I am header!');
}

// 非同期処理
// fetch を使う
function fetch_api(target: string) {
    const res = fetch(target);
    // console.log(res);
    // Promise { <pending> } と出力される

    // callback をattach するだけ
    res
    .then(res => {
        // Response オブジェクトが出力される
        console.log(res);
        // res を jsonとして解釈して js の object を返す
        // できない場合は多分エラーをthrow する
        // https://developer.mozilla.org/ja/docs/Web/API/Response/json
        return res.json();
    })
    .then(console.log)
    // エラーが投げられた場合のcallback
    .catch(console.error)
    // 非同期なのでこの log が先に表示されることがある。
    console.log("fetch_api: successfully exited.");
}

// fetch_api("https://rest.uniprot.org/uniprotkb/P12345.json");
const target_randomuserapi = "https://api.randomuser.me/?nat=US&results=1";
fetch_api(target_randomuserapi);

// fetch を同期間数として呼び出す
async function sync_fetch_api(target: string) {
    // fetch_api 内の処理の終了を待たずにこれが出力される
    console.log("sync_fetch_api: start")
    // await キーワードを使っているので Promise が成功するまで待たれる
    const res = await fetch(target);
    const resobj = await res.json();
    console.log(resobj);
    // 全ての処理が同期的に行われる
    console.log("sync_fetch_api: successfully exited.");
}

sync_fetch_api(target_randomuserapi);
