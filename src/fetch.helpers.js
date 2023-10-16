import { MOCKAPI_ENDPOINT } from "./constants";

export async function SLFunctionRequest(options, SLFunction = "slf") {
  const { params, body, headers, method = "get" } = options;
  const SLFEndpoint = _generateSLFunctionURL(params, SLFunction);

  const response = fetch(SLFEndpoint, {
    method,
    headers: { ...headers }, // "content-type": "multipart/form-data"
    body: body,
  });

  return response;
}

export async function IKUploadAuthenticator() {
  try {
    const response = await SLFunctionRequest({ params: { action: "auth" } });

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

export async function getFromDatabase(params) {
  // console.log({params})
  let endpoint = _generateDatabaseURL(params);
  let response = await fetch(endpoint, {
    method: "get",
  }).then((r) => r.json());

  return response;
}

function _generateDatabaseURL(params) {

  return _generateURL(MOCKAPI_ENDPOINT, [], params);
}

function _generateSLFunctionURL(params, SLFunction = "slf") {
  return _generateURL(".", [".netlify", "functions", SLFunction], params);
}

function _generateURL(host, pathAry, params) {
  let path = "/";
  if (!host || host === ".") host = window.location.origin;
  if (pathAry?.length) path += pathAry.join("/");

  const url = new URL(host + path);

  if (!params) return url.toString();

  for (let query of Object.entries(params)) {
    url.searchParams.set(...query);
  }

  return url.toString();
}

export function postToDatabase(data) {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let endpoint = _generateDatabaseURL();
  // console.log({endpoint})

  return fetch(endpoint, { method: "post", headers, body: JSON.stringify(data) })
  .then(r => r.json())
  .then(function (r) {
    // console.log("r", r);
    return r;
  });
}
