import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import classNames from "classnames";
import { Dropdown, BrandSelector, Button } from "../";
import dropdown from "../../resources/images/dropdown.png";

const styles = {
  brandDropdown: { marginRight: "10px" },
  brandDropdown__dropdown_icon: { marginLeft: "6px", width: "10px" },
};

const DropdownButton = withStyles(styles)(
  ({ classes, children, ...dropdownButtonProps }) => {
    return (
      <Button className={classes.dropdownButton} {...dropdownButtonProps}>
        {children}
        <img className={classes.brandDropdown__dropdown_icon} src={dropdown} />
      </Button>
    );
  }
);

const BrandDropdown = ({
  field,
  fieldMap,
  singleSelect = false,
  className,
  classes,
}) => {
  /** Get brand list */
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <Dropdown
      DropdownButton={DropdownButton}
      dropdownButtonChildren={`Brand${
        selectedBrand !== null ? `: ${selectedBrand}` : ""
      }`}
      className={classNames(classes.brandDropdown, className)}
    >
      <BrandSelector
        field={field}
        singleSelect={singleSelect}
        setSelectedBrand={setSelectedBrand}
        fieldMap={fieldMap}
      />
    </Dropdown>
  );
};

BrandDropdown.propTypes = {
  /** Qlik Sense field name to feed the selector */
  field: PropTypes.string,
  /** Mapping object to convert Qlik Sense values to short name format */
  fieldMap: PropTypes.object,
  /** singleSelect mode allows for only 1 brand selection at a time */
  singleSelect: PropTypes.bool,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

BrandDropdown.defaultProps = {
  singleSelect: false,
};

export default withStyles(styles)(BrandDropdown);
