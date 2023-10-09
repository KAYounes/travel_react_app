import { MOCKAPI_ENDPOINT, NTL_FUNC_BASE } from "../../constants";

// function _generateEndpoint(path, params) {
//   const url = window.location.origin + NTL_FUNC_BASE + (path || "");
//   const endpoint = new URL(url);

//   if (!params) return endpoint.toString();

//   for (let query of Object.entries(params)) {
//     endpoint.searchParams.set(...query);
//   }

//   return endpoint.toString();
// }

// export async function requestFromServer(options) {
//   const {
//     params,
//     body,
//     headers,
//     method = "get",
//     path = "auth"
//   } = options


//   const endpoint = _generateEndpoint(path, params);

//   const response = await fetch(endpoint, {
//     method,
//     headers:{...headers, 'content-type': 'multipart/form-data'},
//     body: body,
//   });

//   return response;
// }

// export async function IKUploadAuthenticator() {
//   try {
//     const response = await requestFromServer({ action: "auth" });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Request failed with status ${response.status}: ${errorText}`
//       );
//     }

//     const data = await response.json();
//     const { signature, expire, token } = data;
//     return { signature, expire, token };
//   } catch (error) {
//     throw new Error(`Authentication request failed: ${error.message}`);
//   }
// }

export async function updateTour(cardID, data){
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

let putEndpoint = `${MOCKAPI_ENDPOINT}/${cardID}`
  let response = _requestFromDatabase(putEndpoint, 'put', headers, data).then(function(r){
    console.log('r', r)
    // console.log('r.json()', r.json())
    return r
  })
  
  return response
}

export async function uploadTour(data) {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
  let response = _requestFromDatabase(MOCKAPI_ENDPOINT, 'post', headers, data).then(function(r){
    console.log('r', r)
    // console.log('r.json()', r.json())
    return r
  })

  return response
}

async function _requestFromDatabase(url, method, headers, data){
  let endpoint = url

  let response = await fetch(endpoint, {
    method,
    headers,
    body: JSON.stringify(data),
}).then((r) => r.json());

return response
}