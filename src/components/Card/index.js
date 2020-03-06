import React from "react";
import withStyles from "react-jss";
<<<<<<< HEAD
import PropTypes from "prop-types";

const styles = {
  border: {
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
    borderRadius: "10px",
    textAlign: "center",
    padding: "10px",
  },
  noborder: {
    padding: "10px",
    margin: "10px 0",
    border: "none",
  },
  card: {
    display: "flex",
    justifyContent: "space-evenly",
    fontFamily: "Rubik",
  },
};

const Card = ({ classes, children, border }) => {
  return (
    <div className={border ? classes.border : classes.noborder}>
      <div className={classes.card}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  /** true or false to show border or not */
  border: PropTypes.bool,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

Card.defaultProps = {
  border: true,
=======

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
>>>>>>> origin/develop
};

export default withStyles(styles)(Card);
