import { switchMap, retry } from "rxjs/operators";

export default (method, ...params) => obs => {
  return obs.pipe(
    switchMap(handle => handle.ask(method, ...params).pipe(retry(3)))
  );
};
