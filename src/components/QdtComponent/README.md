# QDT Component

Component that makes implementation of QdtComponents library slightly easier

## Properties and Configuration

| prop      | description                                                       | type                                                                                                                                                                      |   default |
| --------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------: |
| type      | type of object                                                    | one of parameter types defined [here](https://help.qlik.com/en-US/sense-developer/February2018/Subsystems/APIs/Content/CapabilityAPIs/VisualizationAPI/create-method.htm) | undefined |
| app       | name of app to pull object from as defined in qlik-config.js file | string                                                                                                                                                                    | undefined |
| qdtProps  | qdtComponent properties                                           | [QdtViz props](https://github.com/qlik-demo-team/qdt-components#qdtviz)                                                                                                   | undefined |
| className | className that will be applied to parent link for style overrides | string                                                                                                                                                                    | undefined |
