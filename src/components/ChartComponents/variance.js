import React from "react";
import * as d3 from "d3";
import withStyles from "react-jss";
import downArrow from "../../resources/images/down-arrow.png";
import upArrow from "../../resources/images/up-arrow.png";

const styles = {
  varianceBlock: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "3px",
    paddingBottom: "2px",
    width: "80px",
  },
  image: {
    height: "10px",
    width: "10px",
    padding: "7px",
  },
  variancePercent: {
    fontSize: "15px",
    fontWeight: "700",
    color: "white",
    padding: "3px",
  },
};
const Variance = ({ classes, newValue, oldValue }) => {
  const percentConvertor = newValue - oldValue > 0 ? 100 : -100;
  if (oldValue) {
    return (
      <div
        className={classes.varianceBlock}
        style={
          newValue - oldValue > 0
            ? { background: "#12BF38" }
            : { background: "#EF4A4A" }
        }
      >
        <img
          className={classes.image}
          src={newValue - oldValue > 0 ? upArrow : downArrow}
        ></img>
        <div className={classes.variancePercent}>
          {(((newValue - oldValue) / oldValue) * percentConvertor).toFixed(0)}%
        </div>
      </div>
    );
  } else return null;
};

export default withStyles(styles)(Variance);
