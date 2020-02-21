import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import { ResponsiveBullet } from "@nivo/bullet";

const styles = {
  bullet: {
    height: "20px",
    width: "90%",
    border: "1px solid #C4C4C4",
    borderRadius: "1px",
    margin: "5px 10px 0px 20px",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    width: "90%",
    margin: "20px 0px 20px 20px",
    fontSize: "12px",
    fontWeight: 700,
    // fontFamily: "Rubik",
    fontStyle: "normal",
  },
  trackingPeriod: {
    position: "absolute",
    left: "0",
  },
  gapToGoal: {
    position: "absolute",
    right: "0",
  },
};

const BulletChart = ({ classes, data, period }) => {
  if (data && period) {
    const color =
      data[0].measures[0] > data[0].markers[0] ? "#12BF38" : "#EF4A4A";
    const gapToGoal = data[0].ranges[0] - data[0].measures[0];
    return (
      <div className={classes.bullerChartContainer}>
        <div className={classes.labelContainer}>
          <div className={classes.trackingPeriod}>
            TRACKING TO {period.toUpperCase()} GOAL
          </div>
          <div className={classes.gapToGoal}>{gapToGoal} TO GOAL</div>
        </div>
        <div className={classes.bullet}>
          <ResponsiveBullet
            data={data}
            spacing={50}
            measureSize={1}
            rangeColors="white"
            markerColors="#C4C4C4"
            measureColors={color}
            markerSize={1}
          />
        </div>
      </div>
    );
  } else return null;
};

BulletChart.propTypes = {
  /** The prop 'data' is an array of objects with three keys in each objects nameley 'ranges' , 'measures' & markers
   * ranges defines the entire goal value
   * markers defines the target that needs to be achieved from the entire goal
   * measures defines how much we have reached so far
   */
  data: PropTypes.arrayOf({
    ranges: PropTypes.arrayOf(PropTypes.number),
    measures: PropTypes.arrayOf(PropTypes.number),
    markers: PropTypes.arrayOf(PropTypes.number),
  }),
  /** The prop 'period' defines which period the bullet chart is being calculated for*/
  period: PropTypes.string,
};

export default withStyles(styles)(BulletChart);
