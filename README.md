<img src="https://assets.parallel.ai/dark-parallel-avatar-270.svg" alt="Parallel" width="48" />

# Parallel Task MCP

**Deep research and data enrichment from your AI assistant.**

Research a question or enrich a small dataset, then retrieve the results without leaving your agent. Parallel hosts the service; you do not need to run this repository to use it.

Task MCP requires a Parallel account and authentication. Unlike the free [Search MCP](https://github.com/parallel-web/search-mcp), creating research or enrichment tasks is billable. Review [Task API pricing](https://docs.parallel.ai/getting-started/pricing#task-api) before starting work.

[Setup documentation](https://docs.parallel.ai/integrations/mcp/task-mcp#installation) · [Get an API key](https://platform.parallel.ai) · [Task MCP documentation](https://docs.parallel.ai/integrations/mcp/task-mcp)

## Manual setup

Choose one connection method for your client. Reuse an existing connection to this endpoint rather than adding it twice.

### Claude Code

Run this in the project where you want to use Parallel:

```bash
claude mcp add --transport http --scope project parallel-task https://task-mcp.parallel.ai/mcp
```

Start a new Claude Code session, run `/mcp`, and complete the Parallel sign-in in your browser when prompted.

### Codex

Make your API key available as `PARALLEL_API_KEY` in the environment that launches Codex, then run:

```bash
codex mcp add parallel-task --url https://task-mcp.parallel.ai/mcp \
  --bearer-token-env-var PARALLEL_API_KEY
```

Start a new Codex session and run `/mcp` to check the connection. The configuration references the environment variable, not the key itself. Do not commit API keys to configuration files or paste them into a conversation. For OAuth instead, see the [Codex setup instructions](https://docs.parallel.ai/integrations/mcp/task-mcp#codex-cli).

### Cursor, VS Code, and other clients

Use this server URL with HTTP / Streamable HTTP transport:

```text
https://task-mcp.parallel.ai/mcp
```

For Cursor, merge this into your MCP configuration:

```json
{
  "mcpServers": {
    "parallel-task": {
      "url": "https://task-mcp.parallel.ai/mcp"
    }
  }
}
```

Complete the Parallel sign-in when prompted. Clients without compatible OAuth support can use a Parallel API key as a Bearer token in the `Authorization` header; use the client's secure credential settings rather than hardcoding the key in a shared file.

VS Code uses a top-level `servers` object, not `mcpServers`. Follow the [client-specific setup instructions](https://docs.parallel.ai/integrations/mcp/task-mcp#installation) for its configuration format and authentication options.

## Available tools

| Tool | What it does |
| --- | --- |
| `createDeepResearch` | Starts a research job for a question that needs a detailed, sourced answer. |
| `createTaskGroup` | Starts enrichment jobs for a list of inputs using a common output schema. |
| `getStatus` | Checks whether a run or group is still active. |
| `getResultMarkdown` | Retrieves research or enrichment output as Markdown. |

Verify the connection by checking that these four tools are available. You do not need to start a paid job just to check installation.

## Try it

Research a company:

> Use `createDeepResearch` to research Parallel Web Systems (<https://parallel.ai>). Write a company brief covering its products, target customers, and publicly announced funding. Cite your sources and flag anything you cannot verify.

Enrich a list of companies:

> Use `createTaskGroup` to enrich these three companies: Parallel Web Systems (<https://parallel.ai>), Google (<https://google.com>), and Apple (<https://apple.com>). Return one row per company with its official company name, website, headquarters, founding year, and a one-sentence product description. Include source URLs and leave any fields you cannot verify blank.

Research and enrichment run asynchronously:

1. Start the job once and keep its run or group ID.
2. Use `getStatus` to check progress while continuing other work.
3. Once complete, use `getResultMarkdown` to retrieve and analyze the output.

If your client does not continue automatically, ask it to check the existing job in a follow-up message. Do not create another job just to check progress. See the [workflow guide](https://docs.parallel.ai/integrations/mcp/task-mcp) for more examples.

## Troubleshooting

- **Tools are missing:** start a new agent session, check the MCP connection list, and confirm the URL is `https://task-mcp.parallel.ai/mcp`.
- **Authentication fails:** complete browser sign-in, or check that your client can access a valid API key. For the Codex command above, `PARALLEL_API_KEY` must be present in the environment that launches Codex.
- **Insufficient credits / HTTP 402:** check your balance at [platform.parallel.ai](https://platform.parallel.ai) before starting another task.
- **No results yet:** check the existing ID with `getStatus`; starting a job does not wait for completion.
- **Still stuck:** see the [troubleshooting guide](https://docs.parallel.ai/integrations/mcp/task-mcp#troubleshooting) or [open an issue](https://github.com/parallel-web/task-mcp/issues). Include your client, version, and error message, but leave out credentials and private task inputs or outputs.

## Privacy, support, and security

Task inputs are sent to Parallel to run the requested research or enrichment. Hosted service usage is governed by the [Customer Terms](https://parallel.ai/customer-terms) and [Privacy Policy](https://parallel.ai/privacy-policy).

For product support, contact [support@parallel.ai](mailto:support@parallel.ai). Report security concerns privately to the same address rather than opening a public issue. Do not include API keys or access tokens in reports.

## About this repo

This repository contains a small Cloudflare Worker proxy in [main.ts](main.ts) that forwards `/mcp` requests to the hosted Task MCP. It does not contain the underlying research and enrichment service. Cloning it is optional for hosted-service users.

### Running the proxy locally

With Node.js, npm, and the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) available:

1. Run `npm install`.
2. Run `wrangler dev`.
3. In another terminal, run `npx @modelcontextprotocol/inspector`.
4. Connect the Inspector to `http://localhost:8787/mcp` using Streamable HTTP.

The local proxy still calls the hosted service. Authentication and task charges still apply; this is not an offline task runner.
