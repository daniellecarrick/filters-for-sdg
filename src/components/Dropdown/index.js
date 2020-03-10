import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { Button } from "../";
import classNames from "classnames";
import { BehaviorSubject, fromEvent } from "rxjs";
import { map, withLatestFrom, filter } from "rxjs/operators";
import dropdown from "../../resources/images/dropdown.png";

const styles = {
  dropdown: { position: "relative", height: "100%" },
  dropdownContainer: {
    position: "absolute",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#343a40",
    color: "#fff",
    zIndex: 10,
  },
  dropdownContainer_hidden: { display: "none" },
  brandDropdown__dropdown_icon: { marginLeft: "6px", width: "10px" },
};

const Dropdown = ({
  DropdownButton,
  dropdownButtonChildren,
  className,
  classes,
  children,
}) => {
  const dropdownContainerRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdown$ = useRef(new BehaviorSubject(false)).current;
  useEffect(() => showDropdown$.next(showDropdown), [showDropdown]);

  useEffect(() => {
    const sub$ = fromEvent(document, "click")
      .pipe(
        map(evt => evt.target),
        withLatestFrom(showDropdown$),
        filter(([_el, showDropdown]) => showDropdown),
        filter(([el]) => !dropdownContainerRef.current.contains(el))
      )
      .subscribe(() => setShowDropdown(false));

    return () => sub$.unsubscribe();
  }, [dropdownContainerRef]);

  return (
    <div className={classNames(classes.dropdown, className)}>
      <DropdownButton
        classes={classes}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {dropdownButtonChildren}
      </DropdownButton>
      <div
        ref={dropdownContainerRef}
        className={classNames("dropdown-container", classes.dropdownContainer, {
          [classes.dropdownContainer_hidden]: !showDropdown,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  /** button component that displays in place of the default dropdown button */
  DropdownButton: PropTypes.element,
  /** JSX node to be rendered as a child of DropdownButton. Useful for overriding
   * the label of the DropdownButton without having to fully define the button */
  dropdownButtonChildren: PropTypes.node,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  DropdownButton: ({ onClick, children = "Dropdown", classes }) => (
    <Button onClick={onClick}>
      {children}{" "}
      <img className={classes.brandDropdown__dropdown_icon} src={dropdown} />{" "}
    </Button>
  ),
};

export default withStyles(styles)(Dropdown);
