import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DashLogo from "../DashLogo";
import HamburgerIcon from "../../resources/images/hamburger.png";
import CalendarIcon from "../../resources/images/calendar.png";
import Calendar from "../Calendar"

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  },
  toolbar: {
    justifyContent: "space-between",
    minHeight: '70px',
  },
  menuButton: {
    color: "black",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: 'center',
    flexDirection:'column'
  },
  titleBox: {
    display: "flex",
    alignItems: "center",
    padding: '5px'
  },
  title: {
    color: "black",
    fontSize: "12px",
    //marginLeft: "10px",
    "@media screen and (max-width: 375px)": {
      maxWidth: "50px",
    },
  },
  titleText:{
    marginLeft: "10px",
  },
  titleDate :{
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '14px',
    color: '#000000'
  },
  calendar: {},
};

const DashMenu = ({
  classes,
  className,
  children,
  title = "",
  state: [value, onChange] = [false, () => {}],
  datePicker = "",
  dateString = ""
}) => {
  const hasLogo = title.includes("png");
  const handleChange = () => {
    onChange(value ? false : true);
  };
  console.log('title', title)
  return (
    <>
      <AppBar position="sticky" className={clsx(classes.root, className)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleChange}
          >
            <img src={HamburgerIcon} />
          </IconButton>
          {hasLogo ? (
            <div>
              <div className={classes.titleContainer}>
                <img className={(title && title.length > 0) ? [classes.title, classes.titleText].join(' ') : classes.title} src={title} />
              </div>
              {
                (dateString && dateString.length > 1 ) &&(
                  <div className={classes.titleBox}>
                    <span className={classes.titleDate}>{dateString}</span>
                  </div>
                )
              }
            </div>
          ) : (
            <div className={classes.titleContainer}>
              <div className={classes.titleBox}>
                <DashLogo /> <span className={(title && title.length > 0) ? [classes.title, classes.titleText].join(' ') : classes.title}>{title}</span>
              </div>
              {
                (dateString && dateString.length > 0 ) && (
                  <div className={classes.titleBox}>
                    <span className={classes.titleDate}>{dateString}</span>
                  </div>
                )
              }
            </div>
          )}

          <div className={classes.calendar}>
            <Calendar/>
          </div>
        </Toolbar>
      </AppBar>
      {value ? children : null}
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
