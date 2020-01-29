import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";
import DashLogo from "../DashLogo";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  menuButton: {
    color: "black",
  },
  title: {
    color: "black",
  },
  calendar: {},
};

const Menu = ({ classes, className }) => {
  return (
    <AppBar position="sticky" className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>

        <DashLogo />
        <div className={classes.calendar}>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="calendar"
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Menu.defaultProps = {
  // /** Label above kpi */
  // classes: PropTypes.string,
  // /** className that can access the top level element of this component */
  // className: PropTypes.string,
};

export default withStyles(styles)(Menu);
