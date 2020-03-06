/**
 *
 * @param {{
 * 		state: string,
 * 		dimArray: string[] | {}[],
 * 		measureArray: string[] | {}[],
 * 		measureNames: string[],
 * 		colSortOrder: number[],
 * 		suppressZero: boolean,
 * 		suppressMissing: boolean,
 * 		initialDatafetch: {rows: number, cols: number, shiftRow: number, shiftCol: number},
 * 		mode: string,
 * 		calcCondition: {expr: string, message: string},
 *    qTotalLabel: string || {expr: string},
 *    alwaysExpanded: boolean
 * }} cubeSettings
 */
const buildQlikHypercube = cubeSettings => {
  // what are the dimensions?
  const qDimensions = cubeSettings.dimArray.map(dim => {
    if (typeof dim === "string") {
      return buildQlikDimension({ dimArray: [dim], nullSuppression: true });
    }
    return dim;
  });

  // what are the measures?
  const qMeasures = cubeSettings.measureArray.map((measure, i) => {
    if (typeof measure === "string") {
      return buildQlikMeasure({
        measureExpr: measure,
        label: cubeSettings.measureNames
          ? cubeSettings.measureNames[i] || ""
          : ""
      });
    }
    return measure;
  });

  // what is the mode?
  const qMode = getMode(cubeSettings.mode);

  return {
    qStateName: cubeSettings.state || "$",
    qDimensions,
    qMeasures,
    qInitialDataFetch: [
      cubeSettings.initialDataFetch
        ? {
            qHeight: cubeSettings.initialDataFetch.rows,
            qWidth: cubeSettings.initialDataFetch.cols,
            qLeft: cubeSettings.initialDataFetch.shiftCol,
            qTop: cubeSettings.initialDataFetch.shiftRow
          }
        : {}
    ],
    qMode,
    qCalcCondition: {
      qCond: {
        qv: cubeSettings.calcCondition ? cubeSettings.calcCondition.expr : null
      },
      qMsg: {
        qv:
          cubeSettings.calcCondition && cubeSettings.calcCondition.expr
            ? cubeSettings.calcCondition.message
            : null
      }
    },
    qSuppressZero: cubeSettings.suppressZero || false,
    qSuppressMissing: cubeSettings.suppressMissing || false,
    qInterColumnSortOrder: cubeSettings.colSortOrder || [0],
    qAlwaysFullyExpanded: qMode === "P",
    qShowTotalsAbove: true,
    qIndentMode: true
  };
};

/**
 *
 * @param {{
 * 		libID: string,
 * 		dimArray: string[],
 * 		nullSuppression: boolean,
 * 		sortCriteria: string | [],
 *    ascOrDesc: number,
 * 		grouping: string,
 * 		labelExpr: string,
 * 		totalLabel: {expression: string, text: string}
 * 	}
 * } dimSettings
 */
const buildQlikDimension = dimSettings => {
  // Grouping -- is this a drill down or cyclic or regular?
  const qGrouping = get_qGrouping(
    dimSettings.dimArray.length,
    dimSettings.grouping
  );

  // Sorting of dimension -- one or more than one sorting?
  const ascOrDesc = dimSettings.sortDirection || -1;
  const qSortCriteria = get_qSortingCriterias(dimSettings.sortCriteria, ascOrDesc);

  return {
    qLibraryId: dimSettings.libID,
    qDef: dimSettings.libID
      ? null
      : {
          qGrouping,
          qFieldDefs: dimSettings.dimArray,
          qSortCriterias: qSortCriteria,
          qReverseSort: false,
          qActiveField: 0,
          qLabelExpression: dimSettings.labelExpr
        },
    qTotalLabel: dimSettings.totalLabel
      ? dimSettings.totalLabel.text || {
          qv: dimSettings.totalLabel.expression
        }
      : {
          qv: "Totals"
        },
    qCalcCond: {},
    qAttributeExpressions: [],
    qAttributeDimensions: [],
    qCalcCondition: {
      qCond: {},
      qMsg: {}
    },
    qNullSuppression: dimSettings.nullSuppression || false,
    qShowTotal: true,
    qTotalMode: "TOTAL_EXPR"
  };
};

/**
 *
 * @param {{
 * 		libID: string,
 * 		measureExpr: string,
 * 		calcCondition: {expr: string, message: string},
 * 		label: string,
 * 		description: string,
 * 		relative: boolean,
 * 		sumOfRows: boolean,
 * 		expressions: string[],
 *    sortBy: string,
 *    qSortBy: {}
 * 	}
 * } measureSettings
 */
const buildQlikMeasure = measureSettings => {
  // Sorting of measure -- one or more than one sorting?
  const qSortBy =
    measureSettings.qSortBy || get_qSortBy(measureSettings.sortBy);
  return {
    qLibraryId: measureSettings.libID,
    qDef: measureSettings.libID
      ? null
      : {
          qDef: measureSettings.measureExpr,
          qLabel: measureSettings.label,
          qDescription: measureSettings.description,
          qRelative: measureSettings.relative,
          qBrutalSum: measureSettings.sumOfRows,
          qGrouping:
            measureSettings.expressions &&
            measureSettings.expressions.length > 1
              ? measureSettings.expressions
              : "N",
          qActiveExpression: 0
        },
    qSortBy,
    qCalcCondition: {
      qCond: {
        qv: measureSettings.calcCondition
          ? measureSettings.calcCondition.expr
          : null
      },
      qMsg: {
        qv:
          measureSettings.calcCondition && measureSettings.calcCondition.expr
            ? measureSettings.calcCondition.message
            : null
      }
    }
  };
};

export { buildQlikDimension, buildQlikMeasure, buildQlikHypercube };

/**
 *
 *	HELPER FUNCTIONS BELOW
 *
 */

/**
 *
 * @param {number} arrayLen
 * @param {string} groupDimSetting
 */
const get_qGrouping = (arrayLen, groupDimSetting) => {
  let qGrouping = "N"; //default to none
  if (arrayLen > 1 || groupDimSetting) {
    switch (groupDimSetting) {
      case "drill":
        qGrouping = "H";
        break;
      case "cycle":
        qGrouping = "C";
        break;
      default:
        qGrouping = "N";
        break;
    }
  }

  return qGrouping;
};

/**
 *
 * @param {string} sortBy
 */
const get_qSortBy = sortBy => {
  if (sortBy) {
    return {
      qSortByState: sortBy === "state" ? 1 : 0,
      qSortByFrequency: sortBy === "frequency" ? 1 : 0,
      qSortByNumeric: sortBy === "number" ? 1 : 0,
      qSortByAscii: sortBy === "alpha" ? 1 : 0,
      qSortByLoadOrder: sortBy === "load" ? 1 : 0,
      qSortByExpression:
        sortBy &&
        ["state", "frequency", "number", "alpha", "load"].indexOf(sortBy) < 0
          ? 1
          : 0,
      qExpression:
        sortBy &&
        ["state", "frequency", "number", "alpha", "load"].indexOf(sortBy) < 0
          ? {
              qv: sortBy
            }
          : {},
      qSortByGreyNess: sortBy === "greyness" ? 1 : 0
    };
  }
  // default to this sort criteria
  return {
    qSortByState: 0,
    qSortByFrequency: 0,
    qSortByNumeric: -1,
    qSortByAscii: 0,
    qSortByLoadOrder: 0,
    qSortByExpression: 0,
    qExpression: {
      qv: " "
    }
  };
};

/**
 *
 * @param {string|string[]} sortCriteria
 */
const get_qSortingCriterias = (sortCriteria, ascOrDesc = 1) => {
  if (sortCriteria) {
    const sortArray =
      typeof sortCriteria === "string" ? [sortCriteria] : sortCriteria;

    return sortArray.map(sort => ({
      qSortByNumeric: sort === "number" ? ascOrDesc : 0,
      qSortByAscii: sort === "alpha" ? ascOrDesc : 0,
      qSortByLoadOrder: sort === "load" ? ascOrDesc : 0,
      qSortByExpression:
        sort && ["load", "alpha", "number"].indexOf(sort) < 0 ? ascOrDesc : 0,
      qExpression:
        sort && ["load", "alpha", "number"].indexOf(sort) < 0
          ? { qv: sort }
          : { qv: "" }
    }));
  }

  // default to this sort criteria
  return [
    {
      qSortByNumeric: 0,
      qSortByAscii: 1,
      qSortByLoadOrder: 0,
      qExpression: {}
    }
  ];
};

/**
 *
 * @param {string} mode
 */
const getMode = mode => {
  if (mode) {
    switch (mode.toLowerCase()) {
      case "pivot":
      case "p":
        return "P";
      case "stack":
        return "K";
      case "tree":
      case "t":
        return "T";
      default:
        return "S";
    }
  }

  return "S";
};
