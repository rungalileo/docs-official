// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Generated from errors.yaml by scripts/generate-errors-data.mjs
// Run "npm run gen:errors" to regenerate

export const ERRORS = [
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
    "default_message": "Provider rate limit exceeded. Please retry after a short wait.",
    "user_action": "Reduce request frequency or upgrade quota.",
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
  }
];
