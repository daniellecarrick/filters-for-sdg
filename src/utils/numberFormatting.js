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

export { numbersWithCommas, abbreviateNumber };
