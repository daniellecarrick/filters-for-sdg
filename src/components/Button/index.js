import React from "react";
import classNames from "classnames";
import withStyles from "react-jss";

const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 10px",
    fontFamily: "Rubik !important",
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "14px",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    "&:hover": { backgroundColor: "#212121" },
  },
  button_dark: {
    backgroundColor: "#4a4a4a",
    color: "#fff",
  },
  button_light: {
    border: "0.5px solid #4a4a4a",
    backgroundColor: "transparent",
    color: "#4a4a4a",
  },
  button_lg: {
    padding: "10px 10px",
    fontSize: "18px",
    lineHeight: "21px",
    fontWeight: "bold",
  },
};

export default withStyles(styles)(
  ({
    theme = "dark", // Icon = null,
    size = "sm",
    onClick = () => {},
    className,
    classes,
    children,
  }) => {
    return (
      <button
        className={classNames("button", classes.button, className, {
          [classes.button_dark]: theme === "dark",
          [classes.button_light]: theme === "light",
          [classes.button_lg]: size === "lg",
        })}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);
