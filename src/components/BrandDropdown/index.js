import React, { useState } from "react";
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

export default withStyles(styles)(
  ({ field, singleSelect = false, fieldMap, className, classes }) => {
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
  }
);
