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

export function removeSeparator(value, sep=','){
  if(Number(value) === 'number') return value
  let regex = new RegExp('\\' + sep, 'g')
  return value.replaceAll(regex, '')
}

export function addSeparator(value, sep=','){
  value = value.toString()
  let [whole, ...other] = value.split('.')
  
  if(!Number(value)){
    whole = removeSeparator(whole)
  }

  return whole.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, sep) + (other.length ? '.' + other.join('.') : '');
}

export function addPadding(value, length=2, fill='0'){
  return value.toString().padStart(length, fill)
}

export function addCurrency(value, symbol='$'){
  return symbol + value
}

export function asCurrency(value, sep=',', symbol='$'){
  value = value.toString()
  return addCurrency(addSeparator(value, sep), symbol)
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
