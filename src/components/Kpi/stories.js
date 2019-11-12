import React, { useEffect, useState } from "react";
import Kpi from ".";
import { SessionProvider, useSession } from "../../context";
import { adOpsConfig } from "../../config";
import { qAskReplayRetry } from "../../operators";
import { invalidations } from "rxq";

export default { title: "Kpi" };

export const basic = () => <Kpi label="My KPI">$12.4M</Kpi>;

export const qlik = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <QlikComp />
  </SessionProvider>
);

const QlikComp = () => {
  const {
    rxq: { doc$ },
  } = useSession()[0];

  const [KPI, setKPI] = useState(null);

  useEffect(() => {
    const sub$ = doc$
      .pipe(
        qAskReplayRetry("CreateSessionObject", {
          qInfo: { qType: "kpi" },
          kpi: {
            qValueExpression: `sum({<Type={Curr},LineType={Direct},Rollup={*}-{'ignore','Native','video','CM','native'}>}Impressions)/sum({<Type={Curr},LineType={Capacity},Rollup={*}-{'ignore','Native','video','CM','native'}>}Impressions)`,
          },
        }),
        invalidations(true),
        qAskReplayRetry("GetLayout")
      )
      .subscribe(layout => {
        setKPI(layout.kpi);
      });

    return () => sub$.unsubscribe();
  }, [doc$]);

  return <Kpi label="Direct">{KPI}</Kpi>;
};
