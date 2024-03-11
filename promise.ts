import { dummyFetch } from "./dummyFetch";

dummyFetch("/success/foo")
  .then(
    (response) => console.log(response),
    (error) => console.error(error)
  )
  // resolve されたら こいつの型は Promise<void> になる
  .then((response) => console.log(response));

dummyFetch("/failure/bar").then(undefined, (err) => console.error(err));
