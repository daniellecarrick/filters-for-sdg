// hold all the utility functions for the behaviors section here
// get Table Data from layout
const getTableData = (layout, data, changeSort) => {
  const tableDims = layout.qHyperCube.qDimensionInfo.map((dim, i) => {
    const activeSort =
      layout.qHyperCube.qEffectiveInterColumnSortOrder[0] === i;
    return {
      key: i,
      value: dim.qFallbackTitle,
      sort: dim.qSortIndicator,
      onClick: () => changeSort(i, activeSort, layout),
      dimNum: i + 1,
      activeSort
    };
  });
  const tableMeasures = layout.qHyperCube.qMeasureInfo.map((measure, i) => {
    const activeSort =
      layout.qHyperCube.qEffectiveInterColumnSortOrder[0] ===
      i + tableDims.length;
    return {
      key: i + tableDims.length,
      value: measure.qFallbackTitle,
      sort: measure.qSortIndicator,
      onClick: () => changeSort(i + tableDims.length, activeSort),
      measureNum: i + 1,
      activeSort
    };
  });
  const tableHeader = [...tableDims, ...tableMeasures];
  const tableValues = data.map((row, i) => {
    return {
      key: i,
      values: row.map((cell, j) => {
        // if cell is null, blank out the textValue
        // if number is "NaN", make it a null numValue
        // if cell is a measure, make field null
        return {
          key: j,
          textValue: cell.qIsNull || cell.qText === undefined ? "" : cell.qText,
          numValue: cell.qNum === "NaN" ? null : parseInt(cell.qNum.toFixed(0)),
          field: j < tableDims.length ? tableDims[j].field : null,
          qState: cell.qState,
          qNo: cell.qElemNumber,
          measureNum: j >= tableDims.length ? j - tableDims.length + 1 : null,
          dimNum: j < tableDims.length ? j : null
        };
      })
    };
  });

  return [tableHeader, tableValues];
};

export { getTableData };
