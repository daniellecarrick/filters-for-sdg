# Bar Chart Pacing

Component that can render a bar chart with a benchmark value

## Properties and Configuration

| prop              | description                                                                     | type            |   default |
| ----------------- | ------------------------------------------------------------------------------- | --------------- | --------: |
| dimensions        | object that is used within useChartDimensions hook to create responsive margins | array of string |        [] |
| className         | className that will be applied to parent link for style overrides               | string          | undefined |
| varianceAccessor1 | value to be passed to Variance component for "new" value                        | number          |    number |
| varianceAccessor2 | value to be passed to Variance component for "old" value                        | number          |    number |
| variance          | boolean which tells component whether or not to use Variance component          | boolean         |      true |
| data              | object with items for value, benchmark, and label                               | array           | undefined |
| label             | renders labels for bar, takes labelAccessor function from data                  | function        | undefined |
| value             | renders length of bar and column of bar values, takes valueAccessor function    | function        | undefined |
