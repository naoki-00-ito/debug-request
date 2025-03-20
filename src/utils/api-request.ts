export interface ApiRequestResponse {
  request: {
    url: string;
    options: RequestInit;
    cookies: string | null;
  };
  response: Record<string, unknown>;
}

const apiRequest = async (
  url: string,
  options: RequestInit = {},
): Promise<ApiRequestResponse> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const cookies = response.headers.get('set-cookie');

  return {
    request: {
      url,
      options,
      cookies,
    },
    response: await response.json(),
  };
};

export default apiRequest;
