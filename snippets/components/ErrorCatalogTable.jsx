export const ErrorCatalogTable = () => {
  // BEGIN GENERATED ERRORS
  // AUTO-GENERATED - DO NOT EDIT DIRECTLY
  // Generated from errors.yaml by scripts/generate-errors-data.mjs
  // Run "npm run gen:errors" to regenerate
  const errors =[
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
  // END GENERATED ERRORS

  const groups = [...new Set(errors.map(e => e.error_group))].sort();
  const severities = [...new Set(errors.map(e => e.severity))].sort();

  const [sortColumn, setSortColumn] = useState('error_code');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');

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

    const filteredAndSortedErrors = errors
        .filter(e => filterGroup === 'All' || e.error_group === filterGroup)
        .filter(e => filterSeverity === 'All' || e.severity === filterSeverity)
        .sort((a, b) => {
            let aVal = a[sortColumn];
            let bVal = b[sortColumn];
            
            // Handle numeric sorting for error_code
            if (sortColumn === 'error_code') {
                if (sortDirection === 'asc') {
                    return aVal - bVal;
                }
                return bVal - aVal;
            }
            
            // Handle string sorting
            aVal = String(aVal || '').toLowerCase();
            bVal = String(bVal || '').toLowerCase();
            if (sortDirection === 'asc') {
                return aVal.localeCompare(bVal);
            }
            return bVal.localeCompare(aVal);
        });

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

    return (
        <div style={{ marginLeft: '-1rem', paddingLeft: '1rem', overflow: 'visible', color: colors.text }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center', paddingLeft: '0.5rem' }}>
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
                <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                    Showing {filteredAndSortedErrors.length} of {errors.length} errors
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', maxWidth: '100%', paddingLeft: '0.5rem' }}>
                {Object.keys(groupedErrors).sort().map(group => (
                    <div key={group} id={`group-${group}`} style={{ marginBottom: '2rem' }}>
                        <h3 style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 600, 
                            marginBottom: '0.75rem', 
                            color: colors.text,
                            borderBottom: `1px solid ${colors.border}`,
                            paddingBottom: '0.5rem'
                        }}>
                            {formatGroupName(group)} Errors
                        </h3>
                        <table style={{ minWidth: '1000px', width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                            <thead>
                                <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem 0.75rem 0.75rem', minWidth: '100px' }} onClick={() => handleSort('error_code')}>
                                        Error Code{getSortIndicator('error_code')}
                                    </th>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '150px' }} onClick={() => handleSort('error_type')}>
                                        Type{getSortIndicator('error_type')}
                                    </th>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '100px' }} onClick={() => handleSort('error_group')}>
                                        Group{getSortIndicator('error_group')}
                                    </th>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '80px' }} onClick={() => handleSort('severity')}>
                                        Severity{getSortIndicator('severity')}
                                    </th>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>Message</th>
                                    <th style={{ ...headerStyle, textAlign: 'left', padding: '0.75rem 0.5rem', minWidth: '200px' }}>User Action</th>
                                    <th style={{ ...headerStyle, textAlign: 'center', padding: '0.75rem 0.5rem', minWidth: '80px' }} onClick={() => handleSort('retriable')}>
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
                                            background: idx % 2 === 0 ? colors.bg : colors.bgAlt 
                                        }}
                                    >
                                        <td style={{ padding: '0.75rem 0.5rem 0.75rem 0.75rem', fontWeight: 500, verticalAlign: 'top', minWidth: '100px' }}>
                                            <a 
                                                href={`#error-${error.error_code}`} 
                                                style={{ color: colors.link, textDecoration: 'none' }}
                                            >
                                                {error.error_code}
                                            </a>
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                            {error.error_type}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>
                                            {formatGroupName(error.error_group)}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top' }}>
                                            <span style={{ 
                                                color: getSeverityColor(error.severity), 
                                                fontWeight: 600,
                                                textTransform: 'capitalize'
                                            }}>
                                                {error.severity}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>
                                            {error.default_message}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', color: colors.text }}>
                                            {error.user_action}
                                        </td>
                                        <td style={{ padding: '0.75rem 0.5rem', verticalAlign: 'top', textAlign: 'center', color: colors.text }}>
                                            {error.retriable ? '✓' : '✗'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {filteredAndSortedErrors.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: colors.textMuted }}>
                    No errors match the selected filters.
                </div>
            )}
        </div>
    );
};
