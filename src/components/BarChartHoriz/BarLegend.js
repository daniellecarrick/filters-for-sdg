import React from "react";
import withStyles from "react-jss";

const styles = {};

const BarLegend = classes => {
  return (
    <div className={classes.legendContainer}>
      <rect width={30} height={15} x={0} y={0} fill={"#EF4A4A"} />
    </div>
  );
};

export default withStyles(styles)(BarLegend);
