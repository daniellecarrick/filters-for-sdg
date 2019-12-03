import React from "react";
import PropTypes from "prop-types";
import { Button } from "../";
import classNames from "classnames";
import withStyles from "react-jss";

const styles = {
  buttonGroup: { display: "flex" },
  buttonGroup__button: {
    flexGrow: 1,
    margin: "0 5px",
  },
  buttonGroup__button_inactive: {
    color: "#979797",
    borderColor: "#979797",
  },
};

const ButtonGroup = ({
  buttons,
  selectedButton,
  size,
  onChange,
  className,
  classes,
}) => {
  const onClick = onChange;

  return (
    <div className={classNames("button-group", classes.buttonGroup, className)}>
      {buttons.map(button => (
        <Button
          key={button.name}
          className={classNames(
            "button-group__button",
            classes.buttonGroup__button,
            {
              [classes.buttonGroup__button_inactive]:
                button.name !== selectedButton,
            }
          )}
          size={size}
          theme={button.name === selectedButton ? "dark" : "light"}
          onClick={() => onClick(button.name)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  /** array of buttons to display in group */
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  /** name value of selected button */
  selectedButton: PropTypes.string,
  /** size of buttons */
  size: PropTypes.oneOf(["sm", "lg"]),
  /** function run when selected button changes. Passes in selected button name when run */
  onChange: PropTypes.func,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  buttons: [],
  size: "sm",
  onChange: () => {},
};

export default withStyles(styles)(ButtonGroup);
