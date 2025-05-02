This page provides information about the latest updates and enhancements to Galileo.

## May 2nd, 2025 Release

### Key New Features

1. **Metrics on experiments UI:** Users can now compute additional metrics for logged experiments directly within the experiments UI. Until now, users didn’t have a way to compute more metrics for logged experiments from the UI or SDK.    
![Metrics on experiments UI](images/AddingMetricstoExperimentsinUI-ezgif.com-optimize.gif)

2. **Public APIs** Released public APIs to allow developers to manage logstreams, experiments, and trace data programmatically.

3. **Aggregate metrics and ranking criteria for Experiments** Added to All Experiments page. Aggregate metrics compile the metric values from individual traces in an experiment to show a combined value for each metric on the all experiments page. This enables you to quickly assess the performance of the underlying traces in an experiment. Ranking criteria allow you to determine which experiments were most successful by specifying a weighted average of the underlying metrics for each experiment. 
![Ranking Criteria Interface](/images/Added-aggregate-metrics.png)

4. **Reference output and metadata availability:** The reference output and metadata from the datasets are now available in the corresponding experiment traces so it can easily referenced.
![Reference Output Interface](/images/Reference-output-and-metadata-from-datasets.png)

### Datasets and Playground

5. **Enhanced playground inputs:** to show complete dataset input rather than only variables so you can more flexibly define variables.
![Enhanced Playground Inputs](/images/playground-enhanced-inputs.png)

6. **Flatten to text in dataset upload:** When uploading datasets from a CSV or JSON file, the contents of a column are automatically flattened to text instead of being stored as JSON when there’s only one file column mapped to an input, output or dataset column. 
![Flatten to Text Dataset Upload](/images/flatten-to-text-dataset-upload.png)

7. **New Model in Playground and Metrics** Added Support for new GPT 4.1 model in playground and metrics.

### SDK 

8. **G2.0 Typescript SDK improvements:** Supporting Export types at the top-level (galileo/types), added a method to access the singleton logger.

### General Usability

9. **Performance optimization:** Resolved performance issues causing occasional UI slowdowns, ensuring smoother and faster navigation.

10. **Extended session durations:** to reduce repetitive Google sign-ins, improving user convenience.

11. **Support chat icon control:** You now have the option to show or hide the support chat icon, customizing your interface according to your preferences. Previously, the support chat icon would overlap and cover key user interface elements. This change makes it easier to access the full user interface without the chat icon getting in the way.
