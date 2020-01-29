import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar,
  MenuItem,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { withStyles } from "@material-ui/core/styles";

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

        <Typography variant="h6" className={classes.title}>
          DASH
        </Typography>
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

Menu.defaultProps = {};

export default withStyles(styles)(Menu);
