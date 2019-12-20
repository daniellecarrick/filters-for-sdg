// This function accepts data from 2 segments and calculates the difference.
// Example of expected data input
// const segmentData = [
//   {
//     dimName: "south",
//     dimValue: 10
//   }
// ];

const getDifference = (segment, benchmark) => {
  const outputArray = [];

  segment.map(segment => {
    return benchmark.map(benchmark => {
      if (segment.dimName === benchmark.dimName) {
        return outputArray.push({
          dimName: segment.dimName,
          dimValue: segment.dimValue - benchmark.dimValue,
          segmentValue: segment.dimValue,
          benchmarkValue: benchmark.dimValue
        });
      }
      return null;
    });
  });
  return outputArray;
};

export default getDifference;
