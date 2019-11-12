import React, { useState, useEffect, useRef } from "react";
import { useSession } from "../../context";
import { qAskReplay, invalidations } from "rxq";
import { Subject } from "rxjs";
import { map, tap, withLatestFrom, switchMap } from "rxjs/operators";
import withStyles from "react-jss";
import classNames from "classnames";
import { Dropdown, BrandSelector } from "../";
import * as brandImages from "../../resources/images/brands";

const styles = {
  brandDropdown: {
    marginRight: "10px",
  },
  brandDropdown__container: {
    position: "absolute",
    padding: "20px 20px 30px",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#343a40",
    zIndex: 10,
  },
  brandDropdown__input: {
    width: "90px",
    height: "50px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "140%",
    backgroundPosition: "center",
    backgroundColor: "transparent",
    border: "none",
    opacity: 0.3,
    cursor: "pointer",
    "&:hover": { opacity: 1 },
  },
  brandDropdown__input_selected: { opacity: 1 },
};

export default withStyles(styles)(({ field, fieldMap, className, classes }) => {
  /** Get brand list */
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <Dropdown
      dropdownButtonChildren={`Brand${
        selectedBrand !== null ? `: ${selectedBrand}` : ""
      }`}
      className={classNames(classes.brandDropdown, className)}
    >
      <BrandSelector
        field={field}
        setSelectedBrand={setSelectedBrand}
        fieldMap={fieldMap}
      />
    </Dropdown>
  );
});
