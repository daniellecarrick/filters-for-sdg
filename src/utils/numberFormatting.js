const numbersWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const abbreviateNumber = num => {
  if (num < Math.pow(10, 3)) {
    return num.toFixed(1);
  } else if (num < Math.pow(10, 6)) {
    return (num / Math.pow(10, 3)).toFixed(1) + "K";
  } else if (num < Math.pow(10, 9)) {
    return (num / Math.pow(10, 6)).toFixed(1) + "M";
  } else {
    return (num / Math.pow(10, 9)).toFixed(1) + "B";
  }
};

// Function to conver the number into K / Mn / Bn
const formatNumber = (num, dollar, decimal, percentageValue, time) => {
  const roundOff = decimal ? decimal : 1;
  var formattedNum = 0;
  if (time) {
    return time;
  } else if (percentageValue) {
    return percentageValue + "%";
  } else {
    if (num < Math.pow(10, 3)) {
      formattedNum = num.toFixed(roundOff);
    } else if (num < Math.pow(10, 6)) {
      formattedNum = (num / Math.pow(10, 3)).toFixed(roundOff) + "K";
    } else if (num < Math.pow(10, 9)) {
      formattedNum = (num / Math.pow(10, 6)).toFixed(roundOff) + "M";
    } else {
      formattedNum = (num / Math.pow(10, 9)).toFixed(roundOff) + "B";
    }

    if (dollar) {
      return "$" + formattedNum;
    } else return formattedNum;
  }
};

export { numbersWithCommas, abbreviateNumber, formatNumber };
