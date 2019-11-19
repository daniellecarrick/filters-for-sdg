import React, { useEffect } from "react";

import { fromEvent } from "rxjs";
import {
  auditTime,
  distinctUntilChanged,
  map,
  tap,
  startWith,
} from "rxjs/operators";

const VirtualScroll = React.forwardRef(
  (
    {
      totalRows,
      childHeight,
      visibleRows = 5,
      start = 0,
      fetchNext = () => {},
      children,
    },
    listEl
  ) => {
    // Call props.fetchNext when scroll position changes
    useEffect(() => {
      if (!listEl.current) return;

      const scrollTop$ = fromEvent(listEl.current, "scroll").pipe(
        map(m => m.target.scrollTop),
        startWith(listEl.current.scrollTop),
        auditTime(50)
      );
      const fetch$ = scrollTop$.pipe(
        map(scrollTop => ({
          start: Math.floor((scrollTop / scrollHeight) * totalRows),
        })),
        auditTime(50),
        distinctUntilChanged((a, b) => a.start === b.start),
        tap(t => fetchNext(t))
      );
      const sub = fetch$.subscribe();

      return () => sub.unsubscribe();
    }, [listEl.current, totalRows, visibleRows, childHeight]);

    // calculate the dimensions based on the current data set
    const containerHeight = visibleRows * childHeight;
    const scrollHeight = childHeight * totalRows;
    const offset = childHeight * start;

    return (
      <div
        className="virtual-scroller"
        ref={listEl}
        style={{
          position: "relative",
          overflowY: "auto",
          height: `${containerHeight}px`,
        }}
      >
        <div
          className="virtual-scroll-padding"
          style={{ width: "1px", opacity: 0, height: `${scrollHeight}px` }}
        />
        <div
          className="virtual-scroll-content"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: `translateY(${offset}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default VirtualScroll;
