import React from "react";
import PropTypes from "prop-types";
import { Button } from "../";
import classNames from "classnames";
import withStyles from "react-jss";

const styles = {
  container: {
    padding: "20px",
    margin: "10px",
    display: "flex",
    background: "white",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    borderRadius: "3px",
  },
};

const Card = ({ classes, children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default withStyles(styles)(Card);
