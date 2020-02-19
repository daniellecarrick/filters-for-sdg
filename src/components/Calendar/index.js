import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "react-jss";
import { Button, Grid, IconButton } from "@material-ui/core";
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider

 } from "@material-ui/pickers";
import CalendarIcon from "../../resources/images/calendar.png";

const styles = {};

const CalendarMenu = ({ theme, size, onClick, className, classes, children }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(false);

  const onChangeCalendar = (date) => {
    handleDateChange(date);
    setOpenPicker({
      openPicker : !openPicker
    });

  }
  useEffect(() => {
     console.log('selectedDate', moment(selectedDate).format('ll'));
  },[selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>

        <DatePicker
            value={selectedDate}
            onClose= {() => setOpenPicker(isOpenPicker => !isOpenPicker)}
            onChange= {onChangeCalendar}
            open = {openPicker}
            disableToolbar={true}
            style={{ display: 'none' }}
        />
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="calendar"
          onClick={() => setOpenPicker(isOpenPicker => !isOpenPicker)}
        >
          <img src={CalendarIcon} />
        </IconButton>

    </MuiPickersUtilsProvider>
  );
};

CalendarMenu.propTypes = {
  /** Function run when calendar icon clicked */
  onClick: PropTypes.func,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

CalendarMenu.defaultProps = {
  onClick: () => {},
};

export default withStyles(styles)(CalendarMenu);
