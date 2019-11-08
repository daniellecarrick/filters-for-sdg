# Brand Dropdown

Dropdown selector with Conde Nast brand images that link to Qlik Sense field values.
A custom dropdown button can be passed in. Field name values are expected as the short-names of the brands as detailed in [Brand Short Names](./#brandshortnames).

## Properties and Configuration

| prop           | description                                                       | type            |                       default |
| -------------- | ----------------------------------------------------------------- | --------------- | ----------------------------: |
| DropdownButton | React component that renders the button to open the dropdown menu | React Component | [Button](../Button/README.md) |
| field          | Name of Qlik Sense field that contains the brand name values      | string          |                     undefined |
| className      | className that will be applied to parent link for style overrides | string          |                     undefined |

## Brand Short Names

| brand                | short name |
| -------------------- | ---------- |
| Architectural Digest | AD         |
| Allure               | ALL        |
| Ars Technica         | ARST       |
| Bon Appetit          | BA         |
| Conde Nast Traveler  | CNT        |
| Epicurious           | EPIC       |
| Glamour              | GLAM       |
| GQ                   | GQ         |
| Pitchfork            | PTFK       |
| SELF                 | SELF       |
| The New Yorker       | TNY        |
| Vanity Fair          | VF         |
| Vogue                | VOG        |
| Teen Vogue           | VOGT       |
| Wired                | WIRE       |
