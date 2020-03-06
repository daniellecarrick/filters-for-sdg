import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "react-jss";

import Logo from "../../resources/images/DashLogo.png";

const styles = {
  logo: {
    maxHeight: "50px",
  },
};

const DashLogo = ({ className, classes }) => {
  return <img className={classNames(className, classes.logo)} src={Logo} />;
};

DashLogo.defaultProps = {
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default withStyles(styles)(DashLogo);
