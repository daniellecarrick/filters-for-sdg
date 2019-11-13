# Brand Selector

Brand selection list with Conde Nast brand images that link to Qlik Sense field values.
Field name values are expected as the short-names of the brands as detailed in [Brand Short Names](./#brandshortnames).
If field name values are different than the list below, a brand name mapping object can be passed in.

## Properties and Configuration

| prop             | description                                                                                                                                                                                                     | type     |   default |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------: |
| field            | Name of Qlik Sense field that contains the brand name values                                                                                                                                                    | string   | undefined |
| setSelectedBrand | Function that runs with the list of selected brand names as an input parameter                                                                                                                                  | function |      noop |
| fieldMap         | Mapping object to convert brand names to their short name counterpart. For example, if the value of Allure in the Qlik Sense field is ALLURE, the mapping object would have a key/value pair of { ALLURE: ALL } | object   |      noop |
| singleSelect     | Selecting a brand will deselect all other brands if true                                                                                                                                                        | boolean  |     false |
| className        | className that will be applied to parent link for style overrides                                                                                                                                               | string   | undefined |

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
