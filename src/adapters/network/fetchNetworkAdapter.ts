import type { NetworkPort, NetworkRequest, NetworkResponse } from "@engine/ports/networkPort";

export function createFetchNetworkAdapter(baseUrl: string): NetworkPort {
  return {
    async request(request: NetworkRequest): Promise<NetworkResponse> {
      const init: RequestInit = {
        method: request.method,
      };
      if (request.headers) {
        init.headers = request.headers;
      }
      if (request.body !== undefined) {
        init.body = request.body;
      }

      const response = await fetch(`${baseUrl}${request.path}`, init);

      return {
        status: response.status,
        body: await response.text(),
      };
    },
  };
}
