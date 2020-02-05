const updateURLParameter = (name, newVal, url) => {
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== name) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }
  let rows_txt = temp + "" + name + "=" + newVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
};

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

export { updateURLParameter, getParameterByName };
