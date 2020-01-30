import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DashLogo from "../DashLogo";
import HamburgerIcon from "../../resources/images/hamburger.png";
import CalendarIcon from "../../resources/images/calendar.png";

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
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: "12px",
    marginLeft: "10px",
    "@media screen and (max-width: 375px)": {
      maxWidth: "50px",
    },
  },
  calendar: {},
};

const Menu = ({ classes, className, title }) => {
  return (
    <AppBar position="sticky" className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <img src={HamburgerIcon} />
        </IconButton>
        <div className={classes.titleContainer}>
          <DashLogo /> <span className={classes.title}>{title}</span>
        </div>
        <div className={classes.calendar}>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="calendar"
          >
            <img src={CalendarIcon} />
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
