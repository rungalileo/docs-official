"""
Updates openapi.json spec in the same folder with `x-excluded: true` on paths
we don't want included in the documentation.
"""
import json

# All paths starting with entities included in this list will be included.
# NOTE: Do not end the paths with `/` without deliberation.
INCLUDE_ENDPOINTS_STARTING_WITH = [
    '/v2',
]

def main():
    # Read current OpenAPI spec.
    data = {}
    with open("openapi.json", "r") as f:
        data = json.loads(f.read())

    # Iterate through OpenAPI Spec paths and exclude paths we don't want to include.
    for path, path_val in data["paths"].items():
        # Logic to ensure idempotency of the script.
        if "x-excluded" in data["paths"][path]:
            del data["paths"][path]["x-excluded"]
        
        if not any(path.startswith(sw) for sw in INCLUDE_ENDPOINTS_STARTING_WITH):
            for _, method_val in path_val.items():
                method_val["x-excluded"] = True

    # Overwrite the spec with x-excluded key on paths to be excluded.
    # Details: https://mintlify.com/docs/api-playground/openapi/advanced-features#x-hidden-and-x-excluded
    with open("openapi.json", "w") as f:
        f.write(json.dumps(data, indent=2))

if __name__ == '__main__':
    main()