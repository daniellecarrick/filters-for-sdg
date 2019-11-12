# Dropdown

Dropdown component taking in the content that is shown/hidden as well as an option button component.
When button is clicked, the visibility of any children passed to the Dropdown component is toggled.

## Properties and Configuration

| prop                   | description                                                                                                                                                                                   | type            |                                                                               default |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------: |
| DropdownButton         | React component defining the button to be clicked to toggle the dropdown content. If defined, the component should take in an onClick function that is passed in as the buttons onClick value | React Component | ({ onClick, children = "Dropdown" }) => <Button onClick={onClick}>{children}</Button> |
| dropdownButtonChildren | Children passed to default DropdownButton component if it is not defined                                                                                                                      | string or jsx   |                                                                            "Dropdown" |
| className              | className that will be applied to parent link for style overrides                                                                                                                             | string          |                                                                             undefined |
