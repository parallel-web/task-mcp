import { withSimplerAuth } from "simplerauth-client";
export default {
  fetch: withSimplerAuth(
    async (request, env, ctx) => {
      const url = new URL(request.url);
      const headers = new Headers(request.headers);

      if (url.pathname === "/mcp") {
        const response = await fetch("https://task-mcp.parallel.ai/mcp", {
          body: request.body,
          headers,
          method: request.method,
        });

        return response;
      }
      return new Response("Not found!", { status: 404 });
    },
    {
      isLoginRequired: false,
      oauthProviderPathPrefix: "/getKeys",
      oauthProviderHost: "platform.parallel.ai",
      scope: "key:read",
    }
  ),
};
