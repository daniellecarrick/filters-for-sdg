// This function takes two sets of data with the same metrics for different segments
// and returns the metrics with the highest opportunities according to a threshold
// Data is expected in this shape
// {
// dim_name: 'Text',
// dim_value_client: Number,
// dim_value_marketplace: Number,
// dim_value_gap: Number
// }

const getOpportunities = (rawData, threshold) => {
  const opportunityData = [];
  rawData.forEach(function(metric) {
    if (metric.dim_value_gap <= threshold) {
     return  opportunityData.push(metric);
    }
  });
  if(threshold) {
    opportunityData.slice(0, threshold);
  }
  opportunityData.sort((a, b) => (a.dim_value_gap > b.dim_value_gap ? 1 : -1));
  return opportunityData;
};

export default getOpportunities;
