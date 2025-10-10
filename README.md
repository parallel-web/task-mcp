# Parallel Task MCP

The **Parallel Task MCP** allows initiating deep research or task groups directly from your favorite LLM client. It can be a great way to get to know Parallel’s different APIs by exploring their capabilities, but can also be used as a way to easily do small experiments while developing production systems using Parallel APIs. Please read [our MCP docs here](https://docs.parallel.ai/integrations/mcp/getting-started) for more details.

## Installation

The official installation instructions can be found [here](https://docs.parallel.ai/integrations/mcp/installation).

```json
{
  "mcpServers": {
    "Parallel Task MCP": {
      "url": "https://task-mcp.parallel.ai/mcp"
    }
  }
}
```

## Running locally

<details><summary>Running locally</summary>

This repo contains a proxy to the mcp which is hosted at: https://task-mcp.parallel.ai/mcp

How to run and test locally:

1. `wrangler dev`
2. `npx @modelcontextprotocol/inspector`
3. Connect to server: http://localhost:8787/mcp

</details>
