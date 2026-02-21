export type NetworkRequest = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  headers?: Record<string, string>;
  body?: string;
};

export type NetworkResponse = {
  status: number;
  body: string;
};

export type NetworkPort = {
  request: (request: NetworkRequest) => Promise<NetworkResponse>;
};
