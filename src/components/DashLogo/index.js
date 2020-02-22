import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

import Logo from "../../resources/images/DashLogo.png";

const styles = {};

const DashLogo = ({ classes }) => {
  return <img className={classes} src={Logo} />;
};

DashLogo.defaultProps = {
  /** optional height parameter in pxs. ex. '10px' */
  height: PropTypes.string,
};

export default withStyles(styles)(DashLogo);
