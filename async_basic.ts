function renderA() {
    console.log("Render A: completed in " + Date.now());
}

function renderB() {
    console.log("Render B: completed in " + Date.now());
}

function taskA() {
    console.log("Task A: completed!" + Date.now());
}

function blockTime(timeout: number) {
    // millesec unit
    const startTime = Date.now();
    while(true) {
        const diffTime = Date.now() - startTime;
        if(diffTime >= timeout) break;
    }
}

renderA();
// 非同期のタスクの登録を行う
setTimeout(
    () => {
        taskA();
    }, 1000
);
// 同期処理で2秒スリープさせる。しかしblockTime も renderB も taskA もメインスレッドで実行されるため2sec ほどずれる
blockTime(2000);
renderB();
// taskA は実際にはここらへんで実行される

// -> 非同期処理も同期処理の影響を受ける。
