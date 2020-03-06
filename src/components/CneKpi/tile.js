import React from "react";
import withStyles from "react-jss";

const styles = {
  tileContainer: {
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
    padding: "5% 0% 5% 0",
    margin: "5% 0% 5% 0%",
    textAlign: "center"
  },
  wrapper: {
    textAlign: "center"
  },
  tile: { display: "inline-block", margin: "0 auto" }
};

const Tile = ({ classes, children, wrapper }) => {
  return (
    <div className={wrapper ? classes.wrapper : classes.tileContainer}>
      <div className={classes.tile}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(Tile);
