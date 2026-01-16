import { ProxyAgent } from "undici";

export function makeProxyFetch(proxyUrl: string): typeof fetch {
  const agent = new ProxyAgent(proxyUrl);
  return (input: RequestInfo | URL, init?: RequestInit) => {
    const base = init ? { ...init } : {};
    // @ts-expect-error undici's dispatcher is not in standard RequestInit type
    return fetch(input, { ...base, dispatcher: agent });
  };
}
