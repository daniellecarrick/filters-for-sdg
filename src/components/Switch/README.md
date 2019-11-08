# Switch

Switch component to hold state of true or false, or between two categorical state values

## Properties and Configuration

| prop       | description                                                                                                                          | type                                  |       default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------: |
| textLeft   | text displayed to left of switch                                                                                                     | string                                |         "Off" |
| valueLeft  | identifier value of left switch position                                                                                             | string or number                      |          "off |
| textRight  | text displayed to right of switch                                                                                                    | string                                |          "On" |
| valueRight | identifier value of right switch position                                                                                            | string or number                      |          "on" |
| state      | state object array, the first value of the array contains the current state, and the second value contains the state update function | array of [string or number, function] | ["off", noop] |
| className  | className that will be applied to parent link for style overrides                                                                    | string                                |     undefined |
