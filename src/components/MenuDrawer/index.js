import React from "react";
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

const MenuDrawer = ({ classes, className, list }) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
    <>
      <Drawer
        anchor="left"
        open={true}
        className={classes.root}
        onClick={toggleDrawer("left", false)}
      >
        <List>
          <ListItem className={classes.goHome}>
            <img src={ArrowLeft} className={classes.arrow} />
            Home
          </ListItem>
          {list.map((text, i) => (
            <ListItem className={classes.listitem}>{text}</ListItem>
          ))}
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
