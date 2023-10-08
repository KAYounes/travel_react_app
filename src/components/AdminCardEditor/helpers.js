import { NTL_FUNC_BASE } from "../../constants";

function _generateEndpoint(path, params) {
  const url = window.location.origin + NTL_FUNC_BASE + (path || "");
  const endpoint = new URL(url);

  if (!params) return endpoint.toString();

  for (let query of Object.entries(params)) {
    endpoint.searchParams.set(...query);
  }

  return endpoint.toString();
}

export async function requestFromServer(options) {
  const {
    params,
    body,
    headers,
    method = "get",
    path = "auth"
  } = options


  const endpoint = _generateEndpoint(path, params);

  const response = await fetch(endpoint, {
    method,
    headers:{...headers},
    body: body,
  });

  return response;
}

export async function IKUploadAuthenticator() {
  try {
    const response = await requestFromServer({ params: {action: "auth" }});

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}
