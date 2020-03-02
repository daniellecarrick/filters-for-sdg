import React from "react";
import withStyles from "react-jss";

const styles = {
  container: {
    padding: "20px",
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    background: "white",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    borderRadius: "3px",
  },
};

const Card = ({ classes, children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default withStyles(styles)(Card);
