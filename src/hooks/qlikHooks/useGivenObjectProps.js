import { useState, useEffect } from "react";
import { qAsk, invalidations } from "rxq";
import { GetObject } from "rxq/Doc";
import { GetProperties } from "rxq/GenericObject";
import { retry, switchMap } from "rxjs/operators";

const useGenericObjectProps = (objID, app$) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const objSub = app$
      .pipe(
        qAsk(GetObject, objID),
        invalidations(true),
        switchMap(handle => handle.ask(GetProperties).pipe(retry(3)))
      )
      .subscribe(properties => setValue({ ...properties }));
    return () => objSub.unsubscribe();
  }, []);

  return value;
};

export default useGenericObjectProps;
