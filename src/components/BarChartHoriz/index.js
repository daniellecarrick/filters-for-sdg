import { React, useState, useEffect } from "react";
import withStyles from "react-jss";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip,
} from "victory";

const styles = {
  customTooltip: {
    fontFamily: "Rubik",
    color: "black",
  },
};

const Victory = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = ev => {
    setWidth(ev.target.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <svg
      viewBox={"0 0" + " " + width + " " + "350"}
      preserveAspectRatio="none"
      width="100%"
    >
      <VictoryChart horizontal width={width} height={300} standalone={false}>
        <VictoryAxis
          crossAxis
          // padding={40}
          style={{
            tickLabels: {
              fontSize: 5,
              // angle: 45,
              // marginRight: "20px",
              fontFamily: "Rubik",
              fill: "#C4C4C4",
              textAnchor: "end",
              // verticalAnchor: "middle"
            },
            axis: {
              stroke: "#c4c4c4",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: 6,
              fontFamily: "Rubik",
            },
            axis: {
              stroke: "#fff",
            },
          }}
        />

        <VictoryBar
          data={data}
          style={{
            data: {
              fill: ({ datum }) =>
                datum.timeSpent < datum.goal ? "#FF6361" : "#00205C",
            },
            labels: { fontSize: 10 },
          }}
          x={"brand"}
          y={"timeSpent"}
          cornerRadius={2}
          width={"50px"}
          labels={() => ""}
          labelComponent={
            <VictoryTooltip
              // horizontal={true}
              // constrainToVisibleArea={true}
              // style={{
              //   fontSize: 8,
              //   fontFamily: "Rubik"
              // }}
              // flyoutStyle={{
              //   fill: "white",
              //   boxShadow: "0, 0, 15px, rgba(0,0,0,.2)",
              //   strokeWidth: "0.5px"
              // }}
              flyoutComponent={<CustomTooltip data={data} />}
            />
          }
        />
        <VictoryScatter
          data={data}
          x={"brand"}
          y={"goal"}
          size={2}
          style={{ data: { fill: "#FFA600" } }}
        />
      </VictoryChart>
    </svg>
  );
};

export default withStyles(styles)(Victory);
