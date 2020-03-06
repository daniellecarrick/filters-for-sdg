// if it's the active sort column, switch the sort parameters to opposite
// if it's not the active sort column, make it the active one
const changeSort = (colNumber, isActive) => {
  if (isActive) {
    // how many dimensions do we have?
    const dimensions = layout.qHyperCube.qDimensionInfo;

    // Old props and qPath will change based on if changing a dim or measure
    let oldProps = {};
    let qPath = "";

    if (colNumber > dimensions.length - 1) {
      // Measures -- if no old props in state, then start the current state
      oldProps = measureSortProps
        ? measureSortProps
        : behaviorsObjProps.qHyperCubeDef.qMeasures[
            colNumber - dimensions.length
          ].qSortBy;
      qPath = `/qHyperCubeDef/qMeasures/${colNumber -
        dimensions.length}/qSortBy`;
    } else {
      // Dimensions -- if no old props in state, then start the current state
      oldProps = dimSortProps
        ? dimSortProps
        : behaviorsObjProps.qHyperCubeDef.qDimensions[colNumber].qDef
            .qSortCriterias[0];
      qPath = `/qHyperCubeDef/qDimensions/${colNumber}/qDef/qSortCriterias/0`;
    }

    // calculate the props based on the old props
    let newProps = {};
    Object.keys(oldProps).forEach(key => {
      if (typeof oldProps[key] === "object") {
        newProps[key] = oldProps[key];
      } else {
        newProps[key] = parseInt(oldProps[key] * -1);
      }
    });

    // apply the patch
    behaviorsObjHandle
      .ask(ApplyPatches, [
        {
          qOp: "replace",
          qPath: qPath,
          qValue: JSON.stringify(newProps)
        }
      ])
      .subscribe();

    // set the new props to be the old props
    if (colNumber > dimensions.length - 1) {
      // Measures
      setMeasureSortProps(newProps);
    } else {
      // Dimensions
      setDimSortProps(newProps);
    }
  } else {
    // get the old sort order, then calculate the new sort order
    const oldSort = layout.qHyperCube.qEffectiveInterColumnSortOrder;
    const newSort = [colNumber].concat(
      ...oldSort.filter(number => number !== colNumber)
    );

    // patch the sort order
    behaviorsObjHandle
      .ask(ApplyPatches, [
        {
          qOp: "replace",
          qPath: "/qHyperCubeDef/qInterColumnSortOrder",
          qValue: JSON.stringify(newSort)
        }
      ])
      .subscribe();
  }
};

export { changeSort };
