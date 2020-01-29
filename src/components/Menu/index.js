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
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: "red",
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  "MuiAppBar-colorDefault": {
    color: "red",
  },
};

const Menu = ({ classes, className }) => {
  return (
    <AppBar position="sticky" className={clsx(classes.root, className)}>
      <Toolbar>the menu</Toolbar>
    </AppBar>
  );
};

Menu.defaultProps = {};

export default withStyles(styles)(Menu);
