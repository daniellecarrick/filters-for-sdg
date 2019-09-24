import { qAskReplay } from "rxq";
import { map, switchMap, take } from "rxjs/operators";

export default doc$ => obs =>
  obs.pipe(
    qAskReplay("GetProperties"),
    map(props => props.qInfo.qId),
    switchMap(id => doc$.pipe(qAskReplay("DestroySessionObject", id))),
    take(1)
  );
