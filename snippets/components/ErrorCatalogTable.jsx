export const ErrorCatalogTable = () => {
  // BEGIN GENERATED ERRORS
  // AUTO-GENERATED - DO NOT EDIT DIRECTLY
  // Generated from errors.yaml by scripts/generate-errors-data.mjs
  // Run "npm run gen:errors" to regenerate
  const errors =[
    {
      "error_code": 1000,
      "error_type": "uncataloged_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "An unexpected error occurred. Our team has been notified.",
      "user_action": "Please retry or contact support with the error details.",
      "retriable": false
    },
    {
      "error_code": 1001,
      "error_type": "credentials_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "Authentication failed. Check your credentials and try again.",
      "user_action": "Verify API keys or credentials in integration settings.",
      "http_status_code": 401,
      "retriable": false
    },
    {
      "error_code": 1002,
      "error_type": "llm_api_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "The AI provider rate-limited the request.",
      "user_action": "Retry later, or contact the AI provider to raise your rate limit.",
      "retriable": true,
      "http_status_code": 429
    },
    {
      "error_code": 1003,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "Payload exceeds the provider's context window.",
      "user_action": "Shorten the prompt or split it into smaller requests.",
      "retriable": false
    },
    {
      "error_code": 1004,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "LLM Provider response could not be parsed.",
      "user_action": "Retry the job; if this recurs, contact support with the run ID.",
      "retriable": true
    },
    {
      "error_code": 1005,
      "error_type": "system_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "Temporary connectivity issue communicating with the provider.",
      "user_action": "Retry the request; check provider status if it persists.",
      "retriable": true
    },
    {
      "error_code": 1006,
      "error_type": "not_found_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "The requested resource could not be found.",
      "user_action": "Verify the identifier and try again.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 1007,
      "error_type": "credentials_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "Integration credentials are invalid or expired.",
      "user_action": "Update the integration credentials and retry.",
      "retriable": false
    },
    {
      "error_code": 1008,
      "error_type": "system_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "Temporary issue fetching insights. Please retry shortly.",
      "user_action": "Retry after a few minutes or contact support if it persists.",
      "retriable": true
    },
    {
      "error_code": 1009,
      "error_type": "system_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "Data ingestion failed due to an internal error.",
      "user_action": "Retry the operation; if it persists, contact support with the run ID.",
      "retriable": false
    },
    {
      "error_code": 1010,
      "error_type": "system_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "Internal HTTP request failed while processing this job.",
      "user_action": "Retry the request; if the issue continues, contact support.",
      "retriable": true
    },
    {
      "error_code": 1011,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "The resource is already shared with the specified user or group.",
      "user_action": "Consider updating the existing share permissions instead.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 1012,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "Personal email providers are not allowed.",
      "user_action": "Work email is required to create an account.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 1013,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "This endpoint does not support sharing via user_email; please provide user_id.",
      "user_action": "Use user_id instead of user_email for this endpoint.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 1014,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "The request references the same user multiple times.",
      "user_action": "Ensure each user is specified only once.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 1015,
      "error_type": "configuration_error",
      "error_group": "shared",
      "severity": "high",
      "default_message": "A configuration error prevented the operation from completing.",
      "user_action": "Check your integration configuration and retry.",
      "retriable": false
    },
    {
      "error_code": 1016,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "Input data failed validation checks.",
      "user_action": "Check your input data format and retry.",
      "retriable": false
    },
    {
      "error_code": 1017,
      "error_type": "data_validation_error",
      "error_group": "shared",
      "severity": "medium",
      "default_message": "Invalid role specified in share request.",
      "user_action": "Make sure the role is one of the allowed values.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 2000,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "high",
      "default_message": "Metric job failed due to missing scorer settings.",
      "user_action": "Provide scorer settings for this job and retry.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 2001,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Invalid JSON format in request parameter.",
      "user_action": "Check that filters and sort parameters are valid JSON.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 2002,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Scorer file exceeds maximum allowed size of 1 MB.",
      "user_action": "Reduce the scorer file size and try again.",
      "http_status_code": 413,
      "retriable": false
    },
    {
      "error_code": 2003,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Invalid request parameters.",
      "user_action": "Check your request parameters and try again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 2004,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "The scorer version does not belong to the specified scorer.",
      "user_action": "Verify that the scorer version ID matches the scorer and try again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 2005,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Cannot perform this operation while the metric feedback queue is not accepting new feedback.",
      "user_action": "Please either let the feedback queue finish applying to the metric, or abort the generating/reviewing feedback queue.",
      "http_status_code": 409,
      "retriable": false
    },
    {
      "error_code": 2006,
      "error_type": "workflow_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Custom scorer validation failed.",
      "user_action": "Check your custom scorer code for errors.",
      "retriable": false
    },
    {
      "error_code": 2007,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "Scorer name conflicts with a reserved Galileo metric suffix.",
      "user_action": "Rename your scorer to avoid names ending with reserved suffixes. Reserved suffixes are used internally by Galileo to store metric metadata (e.g., _status, _error_message, _explanation, _rationale, _metric_cost). Choose a name that does not end with any of these.\n",
      "retriable": false,
      "http_status_code": 422
    },
    {
      "error_code": 2008,
      "error_type": "system_error",
      "error_group": "metrics",
      "severity": "high",
      "default_message": "The scoring model is temporarily unavailable.",
      "user_action": "Please retry. If the issue persists, contact support.",
      "retriable": true
    },
    {
      "error_code": 2009,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "Required input data for this metric is missing.",
      "user_action": "Ensure all required fields (e.g., ground truth, tools) are provided for this metric.",
      "retriable": false
    },
    {
      "error_code": 2010,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This record returned an error, so the metric cannot be computed.",
      "user_action": "Investigate the error on the original record. Metrics are computed once the record succeeds.",
      "retriable": false
    },
    {
      "error_code": 2011,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This record was excluded by metric sampling settings.",
      "user_action": "Adjust your sampling rules if you want this record scored.",
      "retriable": false
    },
    {
      "error_code": 2012,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "No child spans are eligible for this metric.",
      "user_action": "Check that child spans match the metric's required types.",
      "retriable": false
    },
    {
      "error_code": 2013,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This metric does not apply to this record type.",
      "user_action": "This metric only applies to specific span types. No action needed.",
      "retriable": false
    },
    {
      "error_code": 2014,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This record was excluded by a metric filter condition.",
      "user_action": "Adjust the metric's filter conditions if you want this record scored.",
      "retriable": false
    },
    {
      "error_code": 2015,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This metric does not aggregate scores from child spans.",
      "user_action": "See individual child spans for their scores.",
      "retriable": false
    },
    {
      "error_code": 2016,
      "error_type": "data_validation_error",
      "error_group": "metrics",
      "severity": "medium",
      "default_message": "Cannot recompute metrics because the number of matching steps exceeds the allowed limit.",
      "user_action": "Refine your filters to reduce the number of steps before recomputing metrics.",
      "retriable": false,
      "http_status_code": 422
    },
    {
      "error_code": 2017,
      "error_type": "llm_api_error",
      "error_group": "metrics",
      "severity": "high",
      "default_message": "File upload(s) to LLM Provider failed.",
      "user_action": "Update LLM Provider configuration.",
      "retriable": false
    },
    {
      "error_code": 2018,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "This metric does not support the file modalities attached to this record.",
      "user_action": "Use metrics that provide the required multimodal capabilities for files attached to this record.",
      "retriable": false
    },
    {
      "error_code": 2019,
      "error_type": "not_applicable_reason",
      "error_group": "metrics",
      "severity": "low",
      "default_message": "Cost tracking is not yet accurate for multimodal LLM calls.",
      "user_action": "Cost will be reported once accurate multimodal cost tracking is implemented.",
      "retriable": false
    },
    {
      "error_code": 3000,
      "error_type": "configuration_error",
      "error_group": "playground",
      "severity": "high",
      "default_message": "Prompt configuration is missing required fields.",
      "user_action": "Reconfigure the playground prompt settings and retry.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 3006,
      "error_type": "data_validation_error",
      "error_group": "playground",
      "severity": "medium",
      "default_message": "A playground with this name already exists in this project.",
      "user_action": "Try a different name, or turn on auto-naming to add a unique suffix.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3007,
      "error_type": "not_found_error",
      "error_group": "playground",
      "severity": "medium",
      "default_message": "The playground run couldn't be found.",
      "user_action": "Check your experiment history for available runs, or start a new one.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3008,
      "error_type": "not_found_error",
      "error_group": "playground",
      "severity": "medium",
      "default_message": "This prompt doesn't exist in the playground.",
      "user_action": "Add a new prompt or select from your existing prompts.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3009,
      "error_type": "not_found_error",
      "error_group": "playground",
      "severity": "medium",
      "default_message": "This playground doesn't exist or was deleted.",
      "user_action": "Go back to your project and select an existing playground, or create a new one.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3010,
      "error_type": "not_found_error",
      "error_group": "playground",
      "severity": "medium",
      "default_message": "This snapshot doesn't exist or was deleted.",
      "user_action": "Check your run history for available snapshots to restore.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3501,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "An experiment with this name already exists for this project.",
      "user_action": "Please use a different experiment name.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3502,
      "error_type": "not_found_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The requested experiment could not be found.",
      "user_action": "Verify the experiment ID and try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3503,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The experiment is not associated with the specified project.",
      "user_action": "Make sure you're viewing the correct project. The experiment may have been moved or deleted.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3504,
      "error_type": "configuration_error",
      "error_group": "experiment",
      "severity": "high",
      "default_message": "Prompt template version ID is required to trigger experiment.",
      "user_action": "Select a prompt template from the dropdown, or create a new template if needed.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3505,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The experiment task type does not match the project type.",
      "user_action": "Create this experiment in a compatible project, or change the experiment type to match this project.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3511,
      "error_type": "not_found_error",
      "error_group": "experiment",
      "severity": "high",
      "default_message": "The specified dataset version does not exist.",
      "user_action": "Select a different version from the dataset version dropdown, or use the latest version.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3512,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "high",
      "default_message": "Your selected Dataset doesn't have generated output values. Please provide a Prompt that uses {{input}} to generate outputs.",
      "user_action": "Upload a dataset with a non-empty 'generated_output' column, or provide a Prompt that uses {{input}} to generate outputs.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 3513,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "high",
      "default_message": "A dataset is required for the generated output flow.",
      "user_action": "Attach a dataset to the experiment before triggering it.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 3514,
      "error_type": "configuration_error",
      "error_group": "experiment",
      "severity": "high",
      "default_message": "A model must be configured to run a prompt template. Please select a model and integration before running the experiment.",
      "user_action": "Select a model and integration in the experiment settings before running.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 3515,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "Playground jobs cannot be created on experiments that already have traces.",
      "user_action": "Create a new experiment run, or use an experiment that has no existing traces.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3520,
      "error_type": "not_found_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The specified experiment group could not be found in this project.",
      "user_action": "Verify the experiment group ID and try again, or use an experiment group name to create one automatically.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3521,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The target experiment group belongs to a different project.",
      "user_action": "Choose an experiment group from the current project and try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3522,
      "error_type": "not_found_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The target experiment group could not be found.",
      "user_action": "Verify the target experiment group and try again.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 3523,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "System experiment groups are managed by the platform and cannot be renamed or deleted.",
      "user_action": "Choose a different experiment group or create a new custom experiment group.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3525,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "An experiment group with this name already exists in this project.",
      "user_action": "Choose a different experiment group name and try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 3527,
      "error_type": "data_validation_error",
      "error_group": "experiment",
      "severity": "medium",
      "default_message": "The experiment group move request is invalid.",
      "user_action": "Verify the experiments and target experiment group, then try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 4000,
      "error_type": "system_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Could not acquire lock for dataset operation.",
      "user_action": "Wait for other operations to complete and try again.",
      "http_status_code": 423,
      "retriable": false
    },
    {
      "error_code": 4001,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Too many records to copy to the dataset.",
      "user_action": "Select fewer records to copy and try again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4002,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Either prompt_template_version_id or prompt_template must be provided.",
      "user_action": "Provide either a prompt template version ID or a prompt template string.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 4003,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Prompt template is empty.",
      "user_action": "Provide a non-empty prompt template.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 4004,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Prompt template is invalid.",
      "user_action": "Check the prompt template format and try again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4005,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Dataset columns cannot contain reserved column names.",
      "user_action": "Remove or rename columns with reserved names and upload again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4006,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Dataset columns cannot contain duplicates.",
      "user_action": "Remove duplicate column names and upload again.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4007,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Dataset is missing required standard columns.",
      "user_action": "Ensure the dataset has the required standard columns.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4008,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "You cannot provide both a file and a dataset ID to copy from.",
      "user_action": "Provide either a file upload or a dataset ID to copy, not both.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4009,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Column mapping can only be applied to draft datasets.",
      "user_action": "Create a new draft dataset or work with the existing column structure.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4010,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "ETag does not match the current entity tag of the resource.",
      "user_action": "Refresh the dataset and retry your operation.",
      "http_status_code": 412,
      "retriable": false
    },
    {
      "error_code": 4011,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Draft datasets do not have versions.",
      "user_action": "Finalize the dataset before working with versions.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4012,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Column mapping validation failed. No columns were provided for mapping.",
      "user_action": "Provide at least one column mapping for input, ground_truth, generated_output, or metadata.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4013,
      "error_type": "data_validation_error",
      "error_group": "dataset",
      "severity": "medium",
      "default_message": "Dataset column validation failed. The 'input' column is required, or invalid columns are present.",
      "user_action": "Ensure your dataset contains the 'input' column. Optional columns are ground_truth, generated_output, and metadata.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 4014,
      "error_type": "system_error",
      "error_group": "dataset",
      "severity": "high",
      "default_message": "Dataset could not be loaded after creation.",
      "user_action": "Retry the operation; if it persists, contact support with the dataset ID.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 5000,
      "error_type": "credentials_error",
      "error_group": "signals",
      "severity": "high",
      "default_message": "Signals authentication failed. The LLM provider rejected the credentials.",
      "user_action": "Verify your LLM provider API key and update it if expired.",
      "retriable": false
    },
    {
      "error_code": 5001,
      "error_type": "llm_api_error",
      "error_group": "signals",
      "severity": "high",
      "default_message": "The LLM provider rate limit was exceeded.",
      "user_action": "Wait a moment and retry, or check your LLM provider quota.",
      "retriable": true
    },
    {
      "error_code": 7000,
      "error_type": "credentials_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Integration authentication failed. The external service rejected the credentials.",
      "user_action": "Verify your integration credentials and update them if expired.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 7001,
      "error_type": "llm_api_error",
      "error_group": "integrations",
      "severity": "medium",
      "default_message": "The external service rate limit was exceeded.",
      "user_action": "Wait a moment and retry, or check your service quota.",
      "retriable": true,
      "http_status_code": 503
    },
    {
      "error_code": 7002,
      "error_type": "system_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "The external service encountered an error.",
      "user_action": "Retry in a few minutes; check the external service status page if it persists.",
      "retriable": true,
      "http_status_code": 502
    },
    {
      "error_code": 7003,
      "error_type": "system_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Could not connect to the external service.",
      "user_action": "Check your network connection and the external service endpoint configuration.",
      "retriable": true,
      "http_status_code": 502
    },
    {
      "error_code": 7004,
      "error_type": "system_error",
      "error_group": "integrations",
      "severity": "medium",
      "default_message": "The external service request timed out.",
      "user_action": "Retry the request; the external service may be temporarily slow.",
      "retriable": true,
      "http_status_code": 504
    },
    {
      "error_code": 7005,
      "error_type": "system_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Received an unexpected response from the external service.",
      "user_action": "Verify the integration configuration; contact support if it persists.",
      "http_status_code": 502,
      "retriable": false
    },
    {
      "error_code": 7006,
      "error_type": "credentials_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Failed to validate integration credentials.",
      "user_action": "Check your credentials and try again.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 7007,
      "error_type": "configuration_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Failed to import the specified CustomLLM module.",
      "user_action": "Ensure the module is installed and accessible in the environment.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 7008,
      "error_type": "configuration_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "The specified class was not found in the module.",
      "user_action": "Verify the class name exists in the specified module.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 7009,
      "error_type": "configuration_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "The specified attribute is not a class.",
      "user_action": "Ensure the class_name refers to an actual class, not a variable or function.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 7010,
      "error_type": "configuration_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "The specified class is not a valid CustomLLM subclass.",
      "user_action": "Ensure the class extends litellm.CustomLLM.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 7011,
      "error_type": "configuration_error",
      "error_group": "integrations",
      "severity": "high",
      "default_message": "Failed to instantiate the CustomLLM class with the provided init_kwargs.",
      "user_action": "Check the init_kwargs match the class constructor parameters.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 7012,
      "error_type": "not_found_error",
      "error_group": "integrations",
      "severity": "medium",
      "default_message": "No integration of this type was found for your account.",
      "user_action": "Verify you have access to an integration of this type.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 8000,
      "error_type": "data_validation_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "An annotation queue with this name already exists in this project.",
      "user_action": "Try a different name, or turn on auto-naming to add a unique suffix.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 8001,
      "error_type": "not_found_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "This annotation queue doesn't exist or was deleted.",
      "user_action": "Go back to your project and select an existing annotation queue, or create a new one.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 8002,
      "error_type": "data_validation_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "This user is already assigned as an annotator to this annotation queue.",
      "user_action": "The user is already an annotator for this queue. No action needed.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 8003,
      "error_type": "not_found_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "This user is not assigned as an annotator to this annotation queue.",
      "user_action": "Verify the user ID and annotation queue are correct.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 8004,
      "error_type": "not_found_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "User not found.",
      "user_action": "Check the user ID and try again.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 8005,
      "error_type": "data_validation_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "Too many records to add to the annotation queue.",
      "user_action": "Select fewer records to add and try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 8006,
      "error_type": "permission_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "You do not have permission to perform this action on the annotation queue.",
      "user_action": "Verify you have the required permissions (read, update, etc.) for this annotation queue.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8007,
      "error_type": "data_validation_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "A rubric with this name already exists in this annotation queue.",
      "user_action": "Try a different name that is not already present in the listed rubrics of this queue.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 8008,
      "error_type": "data_validation_error",
      "error_group": "annotations",
      "severity": "medium",
      "default_message": "New ordering must include all rubrics in the queue, and only rubrics in this queue.",
      "user_action": "Ensure your ordering includes all rubrics currently in the queue, with no extra or missing rubric IDs.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 8009,
      "error_type": "system_error",
      "error_group": "annotations",
      "severity": "high",
      "default_message": "Failed to create rating for annotation.",
      "user_action": "Retry the request; if it persists, contact support with the annotation ID and details.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8500,
      "error_type": "credentials_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Social login verification failed.",
      "user_action": "Verify the SSO provider configuration and try again.",
      "http_status_code": 401,
      "retriable": false
    },
    {
      "error_code": 8501,
      "error_type": "data_validation_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Unsupported social login provider.",
      "user_action": "Use a supported SSO provider and retry.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 8502,
      "error_type": "configuration_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "SAML is not configured for this environment.",
      "user_action": "Contact your administrator to enable SAML authentication.",
      "http_status_code": 501,
      "retriable": false
    },
    {
      "error_code": 8503,
      "error_type": "credentials_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "SAML response validation or authentication failed.",
      "user_action": "Contact your administrator to verify the IdP configuration and try again.",
      "http_status_code": 401,
      "retriable": false
    },
    {
      "error_code": 8504,
      "error_type": "credentials_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Failed to fetch GitHub user information with provided access token.",
      "user_action": "Re-authenticate with GitHub and try again.",
      "http_status_code": 401,
      "retriable": false
    },
    {
      "error_code": 8505,
      "error_type": "data_validation_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Could not determine email from GitHub account.",
      "user_action": "Ensure the GitHub account has a verified email address.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 8506,
      "error_type": "data_validation_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Email or subject not found in SSO token.",
      "user_action": "Contact your administrator to configure the identity provider to send email claims.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 8507,
      "error_type": "system_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Failed to create system user.",
      "user_action": "Retry the request or contact support if it persists.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8508,
      "error_type": "permission_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "You do not have permission to perform this action.",
      "user_action": "Verify you have the required permissions.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8509,
      "error_type": "system_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Failed to resolve organization during SSO role sync.",
      "user_action": "Retry login; if the issue persists, contact support.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8510,
      "error_type": "data_validation_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "No valid organization-role assignments found in the SSO token.",
      "user_action": "Ask your administrator to map organization-role claims in the identity provider.",
      "http_status_code": 401,
      "retriable": false
    },
    {
      "error_code": 8511,
      "error_type": "system_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Failed to resolve organization after SSO role sync.",
      "user_action": "Retry login; if the issue persists, contact support.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8512,
      "error_type": "system_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Failed to resolve user membership after SSO role sync.",
      "user_action": "Retry login; if the issue persists, contact support.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8513,
      "error_type": "system_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Organization could not be loaded after SSO-driven creation.",
      "user_action": "Retry login; if the issue persists, contact support.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 8514,
      "error_type": "credentials_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "Account locked. Please reset your password.",
      "user_action": "Reset your password using the \"Forgot password\" link, or contact your administrator.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8515,
      "error_type": "configuration_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Email and password login is disabled for this environment.",
      "user_action": "Use your organization's SSO provider to log in, or contact your administrator.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8516,
      "error_type": "permission_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Your email is not allowed. Please contact Galileo's support.",
      "user_action": "Verify that you are using an authorized email address, or contact support for assistance.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8517,
      "error_type": "permission_error",
      "error_group": "authentication",
      "severity": "high",
      "default_message": "This user account has been disabled. Please contact Galileo's support.",
      "user_action": "Contact Galileo's support team to resolve account access.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 8518,
      "error_type": "data_validation_error",
      "error_group": "authentication",
      "severity": "medium",
      "default_message": "Email addresses with '+' suffixes are not allowed.",
      "user_action": "Use your primary email address without the '+' suffix.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 9000,
      "error_type": "not_found_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "The view does not exist in the current project, or you do not have access to it.",
      "user_action": "Go back to your project and select an existing view, or create a new one.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 9001,
      "error_type": "not_found_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "The requested view could not be found.",
      "user_action": "Please verify and try again.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 9002,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "The view does not belong to this resource.",
      "user_action": "Please choose a different view.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 9003,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "The view does not belong to the current project.",
      "user_action": "Please choose a valid view for the current project.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 9004,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "A view with this name already exists in this project.",
      "user_action": "Please try with a different name for this view.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 9005,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "Cannot change the view from project-level to user-level.",
      "user_action": "Create a new user-level view instead of changing visibility from Project to User.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 9006,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "Cannot delete the default view.",
      "user_action": "Set a different view as default before deleting this one.",
      "http_status_code": 422,
      "retriable": false
    },
    {
      "error_code": 9007,
      "error_type": "data_validation_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "Cannot change visibility of the default view.",
      "user_action": "Set a different view as default before changing visibility of this one.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 9008,
      "error_type": "permission_error",
      "error_group": "component_view",
      "severity": "medium",
      "default_message": "The current user does not have access to this view.",
      "user_action": "Please choose a view you own or a project-visible view.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 9500,
      "error_type": "system_error",
      "error_group": "authorization",
      "severity": "high",
      "default_message": "The authorization service is temporarily unavailable.",
      "user_action": "Please retry in a few moments. If the problem persists, contact your administrator to verify the health of the authorization service.",
      "retriable": true,
      "http_status_code": 503
    },
    {
      "error_code": 10000,
      "error_type": "data_validation_error",
      "error_group": "user_preferences",
      "severity": "medium",
      "default_message": "Invalid preference scope. For project-scoped preferences, include project_id and either log_stream_id or experiment_id. For global preferences, omit them.",
      "user_action": "Check the scope rules and provide only the IDs required for that scope.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 10001,
      "error_type": "configuration_error",
      "error_group": "user_preferences",
      "severity": "medium",
      "default_message": "Only organization admins can set global preferences.",
      "user_action": "Ask an org admin to update the global preferences.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 10002,
      "error_type": "configuration_error",
      "error_group": "user_preferences",
      "severity": "medium",
      "default_message": "You can only set preferences for your own account.",
      "user_action": "Use your own user account when updating preferences.",
      "http_status_code": 403,
      "retriable": false
    },
    {
      "error_code": 10003,
      "error_type": "not_found_error",
      "error_group": "user_preferences",
      "severity": "low",
      "default_message": "User preference not found.",
      "user_action": "Please save the user preferences first and try again.",
      "http_status_code": 404,
      "retriable": false
    },
    {
      "error_code": 10004,
      "error_type": "data_validation_error",
      "error_group": "user_preferences",
      "severity": "medium",
      "default_message": "Preference already exists.",
      "user_action": "Please retry updating the preference again.",
      "retriable": true,
      "http_status_code": 409
    },
    {
      "error_code": 10500,
      "error_type": "data_validation_error",
      "error_group": "logstream",
      "severity": "medium",
      "default_message": "A log stream with this name already exists for this project.",
      "user_action": "Please use another name.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 10501,
      "error_type": "data_validation_error",
      "error_group": "logstream",
      "severity": "medium",
      "default_message": "Log stream cannot be created in this project type.",
      "user_action": "Use a different project that supports log streams.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 10502,
      "error_type": "system_error",
      "error_group": "logstream",
      "severity": "high",
      "default_message": "Failed to load created log stream.",
      "user_action": "Retry the operation; if it persists, contact support.",
      "http_status_code": 500,
      "retriable": false
    },
    {
      "error_code": 10503,
      "error_type": "data_validation_error",
      "error_group": "logstream",
      "severity": "medium",
      "default_message": "Unknown column requested in log stream query.",
      "user_action": "Check the column names in your query and try again.",
      "http_status_code": 400,
      "retriable": false
    },
    {
      "error_code": 11000,
      "error_type": "data_validation_error",
      "error_group": "organization",
      "severity": "medium",
      "default_message": "Organization name results in a slug that is too long.",
      "user_action": "Use a shorter organization name and try again.",
      "http_status_code": 422,
      "retriable": false
    }
  ];
  // END GENERATED ERRORS

  const groups = [...new Set(errors.map(e => e.error_group))].sort();
  const severities = [...new Set(errors.map(e => e.severity))].sort();

  const [sortColumn, setSortColumn] = useState('error_code');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [targetedErrorCode, setTargetedErrorCode] = useState(null);
  const [copiedErrorCode, setCopiedErrorCode] = useState(null);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    // Detect dark mode via Mintlify's "dark" class on <html> or via prefers-color-scheme
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            const htmlEl = document.documentElement;
            // Mintlify adds class "dark" to <html> when dark mode is active
            if (htmlEl.classList.contains('dark')) {
                setIsDark(true);
            } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !htmlEl.classList.contains('light')) {
                setIsDark(true);
            } else {
                setIsDark(false);
            }
        };

        checkDark();

        // Observe class changes on <html> for dynamic theme switching
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Also listen to system preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkDark);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', checkDark);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }

        const applyHashTarget = () => {
            const hash = window.location.hash || '';
            const match = hash.match(/^#error-(\d+)$/);
            if (!match) {
                setTargetedErrorCode(null);
                return;
            }

            const code = Number(match[1]);
            setTargetedErrorCode(code);

            window.requestAnimationFrame(() => {
                const row = document.getElementById(`error-${code}`);
                if (row) {
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        };

        applyHashTarget();
        window.addEventListener('hashchange', applyHashTarget);

        return () => {
            window.removeEventListener('hashchange', applyHashTarget);
        };
    }, []);

    useEffect(() => {
        if (targetedErrorCode === null) {
            return undefined;
        }

        const timeoutId = window.setTimeout(() => {
            setTargetedErrorCode(null);
        }, 2200);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [targetedErrorCode]);

    // Theme-aware colors
    const colors = isDark
        ? {
            bg: '#1a1a1a',
            bgAlt: '#262626',
            border: '#3f3f46',
            text: '#e4e4e7',
            textMuted: '#a1a1aa',
            selectBg: '#27272a',
            selectBorder: '#3f3f46',
            link: '#38bdf8',
            severityHigh: '#f87171',
            severityMedium: '#fbbf24',
            severityLow: '#4ade80',
            severityCritical: '#ef4444',
        }
        : {
            bg: '#ffffff',
            bgAlt: '#f9fafb',
            border: '#e5e7eb',
            text: '#111827',
            textMuted: '#6b7280',
            selectBg: '#ffffff',
            selectBorder: '#d1d5db',
            link: '#1098F7',
            severityHigh: '#dc2626',
            severityMedium: '#d97706',
            severityLow: '#16a34a',
            severityCritical: '#b91c1c',
        };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const normalizeString = (value) => String(value || '').toLowerCase();

    const matchesSearchTerm = (error) => {
        if (!normalizedSearchTerm) {
            return true;
        }

        return (
            String(error.error_code).includes(normalizedSearchTerm) ||
            normalizeString(error.error_type).includes(normalizedSearchTerm) ||
            normalizeString(error.error_group).includes(normalizedSearchTerm) ||
            normalizeString(error.default_message).includes(normalizedSearchTerm) ||
            normalizeString(error.user_action).includes(normalizedSearchTerm)
        );
    };

    const compareErrors = (a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortColumn === 'error_code') {
            return (a.error_code - b.error_code) * direction;
        }

        const leftValue = normalizeString(a[sortColumn]);
        const rightValue = normalizeString(b[sortColumn]);
        return leftValue.localeCompare(rightValue) * direction;
    };

    const filteredAndSortedErrors = errors
        .filter((error) => filterGroup === 'All' || error.error_group === filterGroup)
        .filter((error) => filterSeverity === 'All' || error.severity === filterSeverity)
        .filter(matchesSearchTerm)
        .sort(compareErrors);

    // Group errors by error_group for section anchors
    const groupedErrors = filteredAndSortedErrors.reduce((acc, error) => {
        if (!acc[error.error_group]) {
            acc[error.error_group] = [];
        }
        acc[error.error_group].push(error);
        return acc;
    }, {});

    const selectStyle = {
        padding: '0.25rem 0.5rem',
        border: `1px solid ${colors.selectBorder}`,
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        background: colors.selectBg,
        color: colors.text,
    };

    const headerStyle = {
        cursor: 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        color: colors.text,
    };
    const contentInset = '0';
    const controlRowStyle = {
        display: 'flex',
        gap: '0.625rem',
        marginBottom: '0.625rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingInline: contentInset,
    };
    const tableScrollWrapperStyle = {
        overflowX: 'auto',
        maxWidth: '100%',
        paddingInline: '0.75rem',
        boxSizing: 'border-box',
    };
    const tableStyle = {
        minWidth: '1280px',
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.8rem',
        tableLayout: 'auto',
    };
    const cellPaddingX = '0.5rem';
    const cellPaddingY = '0.5rem';
    const baseCellStyle = {
        padding: `${cellPaddingY} ${cellPaddingX}`,
        verticalAlign: 'top',
        color: colors.text,
    };
    const baseHeaderCellStyle = {
        ...headerStyle,
        padding: `${cellPaddingY} ${cellPaddingX}`,
    };
    const errorCodeColumnPaddingLeft = '1.25rem';
    const errorCodeHeaderCellStyle = {
        ...baseHeaderCellStyle,
        padding: `${cellPaddingY} ${cellPaddingX} ${cellPaddingY} ${errorCodeColumnPaddingLeft}`,
    };
    const errorCodeDataCellStyle = {
        ...baseCellStyle,
        padding: `${cellPaddingY} ${cellPaddingX} ${cellPaddingY} ${errorCodeColumnPaddingLeft}`,
    };
    const clearButtonStyle = {
        border: `1px solid ${colors.selectBorder}`,
        borderRadius: '0.375rem',
        padding: '0.25rem 0.6rem',
        fontSize: '0.8rem',
        background: colors.selectBg,
        color: colors.text,
        cursor: 'pointer',
    };
    const errorCodeCellInnerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.35rem',
        minWidth: 0,
    };
    const errorCodeLinkStyle = {
        color: colors.link,
        textDecoration: 'none',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        flex: '0 0 auto',
    };
    const copyLinkButtonStyle = {
        border: `1px solid ${colors.border}`,
        borderRadius: '0.25rem',
        padding: '0.2rem',
        background: 'transparent',
        color: colors.textMuted,
        cursor: 'pointer',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
    };

    const getSortIndicator = (column) => {
        if (sortColumn !== column) return ' ↕';
        return sortDirection === 'asc' ? ' ↑' : ' ↓';
    };

    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'critical': return colors.severityCritical;
            case 'high': return colors.severityHigh;
            case 'medium': return colors.severityMedium;
            case 'low': return colors.severityLow;
            default: return colors.text;
        }
    };

    const formatGroupName = (group) => {
        return group.charAt(0).toUpperCase() + group.slice(1);
    };

    const getErrorAnchor = (errorCode) => `#error-${errorCode}`;
    const getRowBackgroundColor = (errorCode, rowIndex) => {
        if (targetedErrorCode === errorCode) {
            return isDark ? '#2b2b38' : '#eef6ff';
        }
        return rowIndex % 2 === 0 ? colors.bg : colors.bgAlt;
    };

    const copyErrorLink = async (errorCode) => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.clipboard) {
            return;
        }

        const directLink = `${window.location.origin}${window.location.pathname}${getErrorAnchor(errorCode)}`;
        try {
            await navigator.clipboard.writeText(directLink);
            setCopiedErrorCode(errorCode);
            window.setTimeout(() => setCopiedErrorCode((value) => (value === errorCode ? null : value)), 1200);
        } catch (_error) {
            // Ignore clipboard failures in environments that block clipboard APIs.
        }
    };
    const clearFilters = () => {
        setSearchTerm('');
        setFilterGroup('All');
        setFilterSeverity('All');
    };

    return (
        <div style={{ overflow: 'visible', color: colors.text, width: '100%', boxSizing: 'border-box' }}>
            {/* Filters */}
            <div style={controlRowStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text }}>Search:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Code, type, message, action"
                        style={{
                            ...selectStyle,
                            minWidth: '220px',
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text }}>Group:</label>
                    <select 
                        value={filterGroup} 
                        onChange={(e) => setFilterGroup(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="All">All Groups</option>
                        {groups.map(g => <option key={g} value={g}>{formatGroupName(g)}</option>)}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: colors.text }}>Severity:</label>
                    <select 
                        value={filterSeverity} 
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="All">All Severities</option>
                        {severities.map(s => <option key={s} value={s}>{formatGroupName(s)}</option>)}
                    </select>
                </div>
                <button
                    type="button"
                    onClick={clearFilters}
                    style={clearButtonStyle}
                >
                    Clear
                </button>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                    Showing {filteredAndSortedErrors.length} of {errors.length} errors
                </div>
            </div>

            {/* Tables by group — heading outside horizontal scroll */}
            {Object.keys(groupedErrors).sort().map(group => (
                <div key={group} id={`group-${group}`} style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 600, 
                        marginBottom: '0.5rem', 
                        color: colors.text,
                        borderBottom: `1px solid ${colors.border}`,
                        paddingBottom: '0.35rem'
                    }}>
                        {formatGroupName(group)} Errors
                    </h3>
                    <div style={tableScrollWrapperStyle}>
                        <table style={tableStyle}>
                            <thead>
                                <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                                    <th style={{ ...errorCodeHeaderCellStyle, textAlign: 'left', minWidth: '10rem' }} onClick={() => handleSort('error_code')}>
                                        Error Code{getSortIndicator('error_code')}
                                    </th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'left', minWidth: '14rem' }} onClick={() => handleSort('error_type')}>
                                        Type{getSortIndicator('error_type')}
                                    </th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'left', minWidth: '9rem' }} onClick={() => handleSort('error_group')}>
                                        Group{getSortIndicator('error_group')}
                                    </th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'left', minWidth: '8rem' }} onClick={() => handleSort('severity')}>
                                        Severity{getSortIndicator('severity')}
                                    </th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'left', minWidth: '16rem' }}>Message</th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'left', minWidth: '16rem' }}>User Action</th>
                                    <th style={{ ...baseHeaderCellStyle, textAlign: 'center', minWidth: '7rem' }} onClick={() => handleSort('retriable')}>
                                        Retriable{getSortIndicator('retriable')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedErrors[group].map((error, idx) => (
                                    <tr 
                                        key={error.error_code} 
                                        id={`error-${error.error_code}`}
                                        style={{ 
                                            borderBottom: `1px solid ${colors.border}`, 
                                            background: getRowBackgroundColor(error.error_code, idx),
                                            scrollMarginTop: '120px'
                                        }}
                                    >
                                        <td style={{ ...errorCodeDataCellStyle, fontWeight: 500, minWidth: '10rem' }}>
                                            <div style={errorCodeCellInnerStyle}>
                                                <a
                                                    href={getErrorAnchor(error.error_code)}
                                                    style={errorCodeLinkStyle}
                                                    aria-label={`Link to error code ${error.error_code}`}
                                                >
                                                    {error.error_code}
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => copyErrorLink(error.error_code)}
                                                    title="Copy direct link"
                                                    aria-label={`Copy direct link for error ${error.error_code}`}
                                                    style={copyLinkButtonStyle}
                                                >
                                                    {copiedErrorCode === error.error_code ? (
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                        >
                                                            <path
                                                                d="M20 6L9 17l-5-5"
                                                                stroke={colors.severityLow}
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            aria-hidden="true"
                                                            focusable="false"
                                                        >
                                                            <path
                                                                d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"
                                                                stroke={colors.textMuted}
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                            />
                                                            <path
                                                                d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"
                                                                stroke={colors.textMuted}
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td style={{ ...baseCellStyle, fontFamily: 'monospace', fontSize: '0.75rem', minWidth: '14rem', overflowWrap: 'anywhere' }}>
                                            {error.error_type}
                                        </td>
                                        <td style={{ ...baseCellStyle, minWidth: '9rem' }}>
                                            {formatGroupName(error.error_group)}
                                        </td>
                                        <td style={{ ...baseCellStyle, minWidth: '8rem' }}>
                                            <span style={{ 
                                                color: getSeverityColor(error.severity), 
                                                fontWeight: 600,
                                                textTransform: 'capitalize'
                                            }}>
                                                {error.severity}
                                            </span>
                                        </td>
                                        <td style={{ ...baseCellStyle, minWidth: '16rem', wordBreak: 'break-word' }}>
                                            {error.default_message}
                                        </td>
                                        <td style={{ ...baseCellStyle, minWidth: '16rem', wordBreak: 'break-word' }}>
                                            {error.user_action}
                                        </td>
                                        <td style={{ ...baseCellStyle, textAlign: 'center', minWidth: '7rem' }}>
                                            {error.retriable ? '✓' : '✗'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {filteredAndSortedErrors.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: colors.textMuted }}>
                    No errors match the selected filters.
                </div>
            )}
        </div>
    );
};
