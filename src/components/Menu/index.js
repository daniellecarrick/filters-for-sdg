import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Drawer,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DashLogo from "../DashLogo";
import HamburgerIcon from "../../resources/images/hamburger.png";
import CalendarIcon from "../../resources/images/calendar.png";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
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

const DashMenu = ({ classes, className, title = "" }) => {
  const hasLogo = title.includes("png");

  return (
    <>
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
          {hasLogo ? (
            <div className={classes.titleContainer}>
              <img className={classes.title} src={title} />
            </div>
          ) : (
            <div className={classes.titleContainer}>
              <DashLogo /> <span className={classes.title}>{title}</span>
            </div>
          )}

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
      <Drawer anchor="left" open={true}>
        <List>
          <ListItem>ListItem</ListItem>
          <ListItem>ListItem</ListItem>
          <ListItem>ListItem</ListItem>
        </List>
      </Drawer>
      {/* <Menu open={true}>
        <MenuItem>MenuItem</MenuItem>
        <MenuItem>MenuItem</MenuItem>
        <MenuItem>MenuItem</MenuItem>
      </Menu> */}
    </>
  );
};

DashMenu.defaultProps = {
  // /** Label above kpi */
  // classes: PropTypes.string,
  // /** className that can access the top level element of this component */
  // className: PropTypes.string,
};

export default withStyles(styles)(DashMenu);
