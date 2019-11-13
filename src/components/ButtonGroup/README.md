# Button Group

Group of buttons used to keep state between selection of multiple values

## Properties and Configuration

| prop           | description                                                                           | type                                 |   default |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------ | --------: |
| buttons        | Array of buttons to render                                                            | array of [buttonItem](./#buttonitem) |        [] |
| selectedButton | name value of the selected button                                                     | string or number                     | undefined |
| onChange       | Function that runs when a button is clicked, returning the name of the button clicked | function                             |      noop |
| size           | Size of buttons, one of either "sm" or "lg"                                           | string                               |      "sm" |
| className      | className that will be applied to parent link for style overrides                     | string                               | undefined |

## buttonItem

| prop  | description                              | type             |
| ----- | ---------------------------------------- | ---------------- |
| name  | unique named used to identify the button | string or number |
| label | label displayed on button                | string           |
