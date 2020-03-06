import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { List, ListItem, Drawer } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ArrowLeft from "../../resources/images/arrow-left.png";

const styles = {
  root: {
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Rubik",
  },
  listitem: {
    margin: "20px 0px",
  },
  goHome: {
    fontSize: "12px",
    fontWeight: 500,
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "20px 0px 20px 20px",
  },
  arrow: {
    marginRight: "20px",
  },
};

const MenuDrawer = ({
  classes,
  children,
  state: [value, onChange] = [false, () => {}],
}) => {
  const handleChange = () => {
    onChange(value ? false : true);
  };
  return (
    <>
      <Drawer
        anchor="left"
        open={value}
        className={classes.root}
        onClick={handleChange}
      >
        <List>
          <ListItem
            className={classes.goHome}
            onClick={() => console.log("home")}
          >
            <img src={ArrowLeft} className={classes.arrow} />
            Home
          </ListItem>
          {children}
        </List>
      </Drawer>
    </>
  );
};

MenuDrawer.defaultProps = {
  // /** Label above kpi */
  // classes: PropTypes.string,
  // /** className that can access the top level element of this component */
  // className: PropTypes.string,
};

export default withStyles(styles)(MenuDrawer);
