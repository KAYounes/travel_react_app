import { MOCKAPI_ENDPOINT, NTL_FUNC_BASE } from "../../constants";
import { addSeparator } from "../../utils";

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

export   function isWithinRange(
  value,
  min,
  max,
  // acceptEmpty = true,
  allowFraction = false,
  allowHalves = false
) {
  const debug = true;
  min = +min;
  max = +max;
  debug && console.log(value, min, max);
  
  // terminate if min or max are not numbers
  if (isNaN(min) || isNaN(max)) return false;
  
  // debug && console.log(1);
  // // terminate if the value is empty
  // if (!value) return acceptEmpty;
  
  debug && console.log(2);
  // terminate if the value is not a number
  if (Number.isNaN(Number(value))) return false;
  
  debug && console.log(3);
  // terminate if number is outside range
  if (value < min) return false;
  
  debug && console.log(4);
  //terminate if number is outside range
  if (value > max) return false;
  
  value = value.toString();
  let fractionPart = Number(value.split(".")[1]);
  
  debug && console.log(5);
  //terminate if fractions are not allow but halves are, and the fraction part is neither empty nor 0.5
  if (allowHalves && !allowFraction)
    return fractionPart ? fractionPart === 5 : true;

  debug && console.log(6);
  //terminate if fractions are not allowed and there is a fraction part
  if (!allowFraction) return fractionPart ? fractionPart === 0 : true;

  return true;
}

function checkNumberRange(value, validation) {
  const debug = false;
  let { min=0, max, fraction, allowHalves } = validation;
  value = value.toString();
  min = +min;
  max = +max;
  debug && console.log(value);

  // terminate if min or max are not numbers
  if (isNaN(min) || isNaN(max)) return false;

  debug && console.log(2);
  // terminate if the value is not a number
  if (Number.isNaN(Number(value))) return false;

  if (value === "") return false;

  debug && console.log(3);
  // terminate if number is outside range
  if (value < min) return false;

  debug && console.log(4);
  //terminate if number is outside range
  if (value > max) return false;

  let fractionPart = Number(value.split(".")[1]);

  debug && console.log(5);
  //terminate if fractions are not allow but halves are, and the fraction part is neither empty nor 0.5
  if (allowHalves && !fraction)
    return fractionPart ? fractionPart === 5 : true;

  debug && console.log(6);
  //terminate if fractions are not allowed and there is a fraction part
  if (!fraction) return fractionPart ? fractionPart === 0 : true;

  return true;
}

export function checkStringLength(string, validation) {
  const stringLength = string?.length ?? 0;
  if (stringLength === undefined) return false;
  const { min = 1, max = 30 } = validation;

  if (min) if (stringLength < min) return false;
  if (max) if (stringLength > max) return false;

  return true;
}

export function defaultValidationMessage(type, validation) {
  if (type === "text") return defStringValidationMsg(validation);
  if (type === "numeric") return defNumberValidationMsg(validation);
  if (type === "select") return defSelectValidationMsg(validation);
}

export function defNumberValidationMsg(validation) {
  const { min=0, max } = validation;
  let validationMessage = `Please enter a number between ${addSeparator(
    min
  )} and ${addSeparator(max)}`;

  if (!validation.fraction) validationMessage += ", no decimals are allowed";

  if (validation.allowHalves) validationMessage += " only haves (i.e. 2.5)";

  validationMessage += ".";
  return validationMessage;
}

export function defStringValidationMsg(validation) {
  let validationMessage;
  const { min, max } = validation;

  if (!min) validationMessage = "This field cannot be empty";
  else
    validationMessage = `This field must contain at least ${min} characters`;

  if (max)
    validationMessage += `, and cannot be loner than ${max} characters long`;

  validationMessage += ".";
  return validationMessage;
}

export function defSelectValidationMsg() {
  return 'Please select on of the options'
}

export function acceptBlank(value, strict) {
  if (strict) return false;
  return value === "";
}

export function validate(type, value, validation, strict) {
  if (type === "text") return validateString(value, validation, strict);
  if (type === "numeric") return validateNumber(value, validation, strict);
  // if (type === "numeric") return validateNumber(value, validation, strict);
  return true
}

export function validateString(value, validation, strict) {
  return (
    checkStringLength(value, validation) ||
    acceptBlank(value, strict)
  );
}

export function validateNumber(value, validation, strict) {
  return (
    checkNumberRange(value, validation) || acceptBlank(value, strict)
  );
}

// export function validateSelect(value) {
//   return (
    
//   );
// }

export function checkFileExist(fileList) {
  if (!(fileList instanceof FileList)) return false;
  if (fileList.length === 0) return false;
  return true;
}

export function checkIsBlank(value){
  if(value?.length){
    return value.length === 0
  }
  else{
    return true
  }
}

// function convertImageToString(file, onloadCallback)
// {
//   if (! (file instanceof File)) return null
//   const fileReader = new FileReader();

//   fileReader.onload = function (event) {
//     const img = event.target.result;
//     onloadCallback(img)
//   };

//   fileReader.readAsDataURL(file);
// }

export function convertImageToString(file) {
  if (! (file instanceof File)) return null

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}