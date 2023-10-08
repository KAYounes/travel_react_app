import { NTL_FUNC_BASE } from "./constants";
//

export function range(count) {
  return Array(count).fill(0);
}

export const numberFormatter = function (num) {
  return {
    value() {
      return num;
    },
    addCommas() {
      let numStr = num.toString();
      num = numStr.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, ",");
      return this;
    },
    addCurrency() {
      let numStr = num.toString();
      num = "$" + numStr;
      return this;
    },
    addPadding(){
      let numStr = num.toString();
      num = numStr.padStart(2, '0');
      return this;
    }
  };
};

export function removeCommas(value){
  value = value.toString()
  return value.replaceAll(/,/g, '')
}

// function _generateEndpoint(path, params) {
//   const url = window.location.origin + NTL_FUNC_BASE + (path || "");
//   const endpoint = new URL(url);

//   if (!params) return endpoint.toString();

//   for (let query of Object.entries(params)) {
//     endpoint.searchParams.set(...query);
//   }

//   return endpoint.toString();
// }

// export async function requestFromServer(
//   params,
//   body,
//   headers,
//   method = "get",
//   path = "auth",
// ) {
//   const endpoint = _generateEndpoint(path, params);

//   const response = await fetch(endpoint, {
//     method,
//     headers,
//     body: JSON.stringify(body),
//   });

//   return response;
// }
