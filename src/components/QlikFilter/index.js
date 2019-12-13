import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

import {
  SelectListObjectValues,
  SelectListObjectExcluded,
  ClearSelections,
  BeginSelections,
  AbortListObjectSearch,
  EndSelections,
  SearchListObjectFor,
  AcceptListObjectSearch,
  GetListObjectData,
} from "rxq/GenericObject";
import {
  map,
  filter,
  debounceTime,
  switchMap,
  tap,
  partition,
  retry,
  switchMapTo,
} from "rxjs/operators";
import { fromEvent, concat, merge, empty, of, Subject } from "rxjs";

import { useSession } from "../../context";
import useListBoxHandle from "../../hooks/useListBox";
import useLayout from "../../hooks/useLayout";

import checkbox_checked from "./checkbox_checked.png";
import checkbox_unchecked from "./checkbox_unchecked.png";

import VirtualScroll from "./virtualscroll";

const componentStyles = {
  container: {
    width: "100%",
    fontFamily: "Rubik !important",
  },
  filterBox: {
    borderRadius: "3px",
    backgroundColor: "rgba(234,235,236, 0.57)",
    color: "#3A3A3A",
    display: "flex",
    cursor: "pointer",
    padding: "6px 10px",
    border: ["1px", "solid", "#DCE0E0"],
    fontSize: "12px",
    whiteSpace: "nowrap",
  },
  selected: {
    backgroundColor: "#4A4A4A",
    color: "#FFFFFF",
  },
  openBox: {
    backgroundColor: "#C2C9D1",
    color: "white",
    fontWeight: 600,
  },
  fieldName: {
    margin: "auto",
    fontSize: "12px",
  },
  ulContainer: {
    position: "relative",
    zIndex: 99,
  },
  listContainer: {
    borderRadius: "2px",
    boxShadow: [0, "2px", "3px", 0, "rgba(71,70,71,0.26)"],
    border: ["1px", "solid", "rgba(71,70,71,0.26)"],
    background: "#FFFFFF",
    position: "absolute",
    left: 0,
    top: "100%",
    width: "100%",
    minWidth: "225px",
    maxWidth: "225px",
    padding: "15px",
    maxHeight: "300px",
  },
  list: {
    listStyleType: "none",
    background: "#FFFFFF",
    padding: 0,
    margin: 0,
  },
  listItem: {
    lineHeight: "26px",
    cursor: "pointer",
    "&:hover": {
      fontWeight: 600,
    },
    fontSize: "12px",
    display: "flex",
    fontWeight: "normal",
    flexDirection: "row",
  },
  clearText: {
    textTransform: "uppercase",
    fontWeight: "normal",
    fontSize: "10px",
    color: "#C2C9D1",
    cursor: "pointer",
    "&:hover": {
      color: "black",
      opacity: 0.6,
    },
  },
  selectExcluded: {
    textTransform: "uppercase",
    fontWeight: "normal",
    fontSize: "10px",
    color: "#C2C9D1",
    cursor: "pointer",
    "&:hover": {
      color: "black",
      opacity: 0.6,
    },
  },
  search: {
    marginBottom: 5,
    borderBottom: "1px solid rgba(0,0,0,.4)",
    fontFamily: "Clear Sans",
    "& input": {
      border: "none",
      outline: "none",
      width: "100%",
      lineHeight: "20px",
    },
  },
  checkBox: {
    paddingRight: "10px",
    paddingLeft: "10px",
    margin: "auto 0px",
    height: "12px",
    width: "12px",
  },
  loading: {
    opacity: 0.2,
  },
  excludedItem: {
    opacity: 0.2,
  },
  arrow: {
    marginLeft: "8px",
  },
  valueName: {
    flexGrow: 1,
  },
  onlyValue: {
    textTransform: "uppercase",
    fontWeight: "normal",
    fontSize: "10px",
    color: "#C2C9D1",
    cursor: "pointer",
    "&:hover": {
      color: "black",
      opacity: 0.6,
    },
  },
  toggleSymbol: {
    color: "#D5D5D5",
    marginLeft: "10px",
    lineHeight: "14px",
    fontSize: "10px",
  },
};

const QlikFilterComponent = ({ classes, fieldName, displayName }) => {
  // get listbox layout and handle
  // const context = useContext(QlikContext);
  const {
    rxq: { doc$ },
  } = useSession()[0];
  // const handle = useListBoxHandle(fieldName, context.app$);
  const handle = useListBoxHandle(fieldName, doc$);
  const [layout, layoutLoading] = useLayout(handle);
  const containerEl = useRef(null);
  const searchEl = useRef(null);
  const listEl = useRef(null);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ qMatrix: [], qTop: 0 });

  const fetchNext$ = useRef(new Subject());

  // Open/Close = Begin/End Selections mode
  useEffect(() => {
    if (!containerEl.current) return;

    const [clickIn$, clickOut$] = fromEvent(
      document.querySelector("body"),
      "click"
    ).pipe(partition(click => containerEl.current.contains(click.target)));

    const sub = merge(
      clickIn$.pipe(
        // Note: Aborting list object search and ending selections on open, in case a different list object/selection modal was already open
        switchMap(() =>
          open
            ? empty()
            : concat(
                handle.ask(AbortListObjectSearch, "/qListObjectDef"),
                handle.ask(EndSelections, true)
              )
        ),
        switchMap(() =>
          open ? empty() : handle.ask(BeginSelections, ["/qListObjectDef"])
        ),
        tap(() => setOpen(true))
      ),
      clickOut$.pipe(
        switchMap(() =>
          open
            ? concat(
                handle.ask(AbortListObjectSearch, "/qListObjectDef"),
                handle.ask(EndSelections, true)
              )
            : empty()
        ),
        tap(() => {
          // listEl.current.scrollTop = 0;
          setOpen(false);
        })
      )
    ).subscribe();

    return () => sub.unsubscribe();
  }, [containerEl.current, listEl.current, handle, open]);

  // Search/Accept results
  useEffect(() => {
    if (!searchEl.current) return;

    const sub = fromEvent(searchEl.current, "keyup")
      .pipe(
        map(m => ({
          isSubmitting: m.keyCode === 13,
          value: m.target.value,
        })),
        switchMap(({ isSubmitting, value }) => {
          const action$ = !isSubmitting
            ? handle.ask(SearchListObjectFor, "/qListObjectDef", value)
            : concat(
                handle.ask(AcceptListObjectSearch, "/qListObjectDef", true),
                handle.ask(EndSelections, true)
              );
          return action$.pipe(
            tap(t => {
              // reset the list scroll position if we're searching
              listEl.current.scrollTop = 0;

              if (isSubmitting) {
                searchEl.current.value = "";
                searchEl.current.blur();
              }
            })
          );
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [searchEl.current, listEl.current, handle]);

  // Listbox Selections
  // - single-select, select-only, select-excluded, clear-selections
  useEffect(() => {
    if (!containerEl.current || !layout.qInfo) return;

    const sub = fromEvent(containerEl.current, "click")
      .pipe(
        debounceTime(300),
        filter(evt => evt.target.hasAttribute("data-qaction")),
        map(event => ({
          event,
          qAction: event.target.getAttribute("data-qaction"),
          qNo: parseInt(event.target.getAttribute("data-qno")),
        })),
        switchMap(({ event, qAction, qNo }) => {
          let action$;
          const qPath = "/qListObjectDef";

          const resetScroll$ = of(true).pipe(
            tap(() => {
              listEl.current.scrollTop = 0;
            })
          );
          const fetch$ = of(true).pipe(
            tap(() => {
              fetchNext$.current.next({ start: data.qTop });
            })
          );
          const resetScrollAndFetch$ = concat(resetScroll$, fetch$);
          const clearAndSelectValue$ = handle.ask(ClearSelections, qPath).pipe(
            switchMapTo(handle.ask(SelectListObjectValues, qPath, [qNo], true)),
            tap(() => {
              fetchNext$.current.next({ start: data.qTop });
            }),
            tap(() => {
              listEl.current.scrollTop = 0;
            })
          );

          switch (qAction) {
            case "select-excluded":
              action$ = concat(
                handle.ask(SelectListObjectExcluded, qPath, false),
                resetScrollAndFetch$
              );
              break;

            case "clear-selections":
              action$ = concat(
                handle.ask(ClearSelections, qPath, [0]),
                resetScrollAndFetch$
              );
              break;

            case "select-only":
              action$ = concat(
                // clearAndSelectValue$,
                // handle.ask(ClearSelections, qPath),
                // handle
                //   .ask(SelectListObjectValues, qPath, [qNo], true)
                //   .pipe(tap(h => console.log("after select", h))),
                // resetScrollAndFetch$
                of(1)
              );
              clearAndSelectValue$.subscribe();
              break;

            case "select": // Single select
              action$ = concat(
                handle.ask(SelectListObjectValues, qPath, [qNo], true),
                fetch$
              );
              break;

            default:
              return empty();
          }

          return action$;
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [containerEl.current, listEl.current, handle, layout.qInfo, data.qTop]);

  // Listbox Data / Virtual Scrolling
  useEffect(() => {
    const sub = fetchNext$.current
      .pipe(
        switchMap(({ start: qTop }) => {
          const pages = [{ qTop, qLeft: 0, qWidth: 1, qHeight: 10 }];
          return handle.ask(GetListObjectData, "/qListObjectDef", pages).pipe(
            retry(3),
            tap(qDataPages =>
              requestAnimationFrame(() => {
                const d = qDataPages.reduce((acc, x) => x.qMatrix, []);
                setData({ qMatrix: d, qTop });
              })
            )
          );
        })
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [handle]);

  // build the display from the selected values
  const CHAR_LIMIT = 30;
  let display,
    hasSelection = false;
  const selections = layout.selections || "-";
  if (selections === "-") {
    display = `All ${displayName}`;
  } else {
    hasSelection = classes.selected;
    display = displayName + ": ";
    const selectedValues = selections.split(",");
    selectedValues.forEach((value, i) => {
      display = display + value;
      if (i < selectedValues.length - 1) {
        display = display + ", ";
      }
    });
    // if we're over the character limit, just put the # of selections
    if (display.length > CHAR_LIMIT) {
      display = `${displayName} (${selectedValues.length}/${layout.qListObject.qDimensionInfo.qCardinal})`;
    }
  }

  // should box be highlighted for drop down?
  const boxOpenStyle = open ? classes.openBox : null;

  // classnames cx() here???
  // const containerClasses = cx('qlb-container', props.className)
  // const filterBtnClasses = cx('qlb-filter-button', open, hasSelection)
  // etc. for cleaner render
  // <div className={containerClasses} ref={containerEl}>
  //   <div className={filterBtnClasses} onClick=(() => setOpen(!open))>
  // etc.

  const { qMatrix, qTop } = data;

  return (
    <div className={classes.container} ref={containerEl}>
      <div
        className={`${classes.filterBox} ${hasSelection} ${boxOpenStyle}`}
        onClick={() => setOpen(!open)}
      >
        <span className={classes.fieldName}>
          {display}{" "}
          {open ? (
            <span className={classes.toggleSymbol}>&#9650;</span>
          ) : (
            <span className={classes.toggleSymbol}>&#9660;</span>
          )}
        </span>
      </div>
      <div
        style={{ display: open ? "block" : "none" }}
        className={`${classes.ulContainer} ${
          layoutLoading ? classes.loading : null
        }`}
      >
        <div className={classes.listContainer}>
          <div className={classes.clearText} data-qaction="clear-selections">
            Clear Selections
          </div>
          <div
            className={classes.selectExcluded}
            data-qaction="select-excluded"
          >
            Select Excluded
          </div>
          <div className={classes.search}>
            <input ref={searchEl} placeholder="Search..." />
          </div>
          {open && (
            <VirtualScroll
              ref={listEl}
              childHeight={26}
              totalRows={layout.qListObject ? layout.qListObject.qSize.qcy : 0}
              start={qTop}
              fetchNext={d => fetchNext$.current.next(d)}
            >
              <ul className={classes.list}>
                {qMatrix.map(item => {
                  const { qElemNumber, qState, qText } = item[0];
                  return (
                    <li
                      key={qElemNumber}
                      className={`${classes.listItem} ${
                        qState === "X" ? classes.excludedItem : null
                      }`}
                      data-qaction="select"
                      data-qno={qElemNumber}
                    >
                      <img
                        className={classes.checkBox}
                        src={
                          qState === "S" ? checkbox_checked : checkbox_unchecked
                        }
                        alt="clear selections"
                        data-qaction="select"
                        data-qno={qElemNumber}
                      />
                      <span
                        className={classes.valueName}
                        data-qaction="select"
                        data-qno={qElemNumber}
                      >
                        {qText}
                      </span>
                      <span
                        className={classes.onlyValue}
                        style={{ marginLeft: "10px" }}
                        data-qaction="select-only"
                        data-qno={qElemNumber}
                      >
                        only
                      </span>
                    </li>
                  );
                })}
              </ul>
            </VirtualScroll>
          )}
        </div>
      </div>
    </div>
  );
};

QlikFilterComponent.propTypes = {
  fieldName: PropTypes.string,
};

export default withStyles(componentStyles)(QlikFilterComponent);
