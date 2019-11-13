# Navigator

Fixed navigation component to move between page sections

## Properties and Configuration

| prop      | description                                                       | type                                     |   default |
| --------- | ----------------------------------------------------------------- | ---------------------------------------- | --------: |
| positions | array of position objects                                         | array of [positionItem](./#positionitem) |        [] |
| className | className that will be applied to parent link for style overrides | string                                   | undefined |

### positionItem

| prop   | description                                           | type             |
| ------ | ----------------------------------------------------- | ---------------- |
| id     | unique identifier for section                         | number or string |
| anchor | element id to scroll to when clicked                  | string           |
| label  | label displayed in popup when navigation item hovered | string           |
