# Security policy

## Reporting a vulnerability

If you find a security issue in this repository or the hosted Parallel Task MCP service (`task-mcp.parallel.ai`), report it privately to [support@parallel.ai](mailto:support@parallel.ai). Please do not open a public GitHub issue for security reports.

Include the affected client or endpoint, steps to reproduce with non-sensitive sample data, and the impact you believe the issue has. Never send API keys, OAuth tokens, or private task inputs or outputs in a report.

## Scope

- This repository contains documentation and a Cloudflare Worker proxy. The research and enrichment service runs on Parallel's infrastructure.
- Task MCP requires authentication. Use your client's secure credential storage or environment-variable support instead of committing credentials to configuration files.
- The creation tools, `createDeepResearch` and `createTaskGroup`, start billable work. Limit reproduction steps to work you are authorized to run; use accounts and data you control.
- Do not attempt to access another customer's tasks or results while investigating an issue.

## Service and data handling

Use of the hosted service is governed by the [Customer Terms](https://parallel.ai/customer-terms) and [Privacy Policy](https://parallel.ai/privacy-policy).
