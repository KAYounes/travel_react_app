/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";
import { IKUpload } from "imagekitio-react";
import { LoremIpsum } from "lorem-ipsum";
//
import styles from "./styles.module.css";
import StarRating from "../ui_components/StarRating/StarRating";
import { COUNTRIES, MOCKAPI_ENDPOINT } from "../../constants";
import {
  MAX_DURATION,
  MIN_DURATION,
  MAX_IMG_SIZE_MB,
  MAX_RATING,
  MIN_RATING,
  REGEX_IMG_TYPE,
  MIN_POPULARITY,
  MAX_POPULARITY,
  MIN_PRICE,
  MAX_PRICE,
  MAX_DETAILS_LENGTH,
  MIN_DETAILS_LENGTH,
} from "./constants";
import { addSeparator, asCurrency, unformatNumber } from "../../utils";
import { updateTour, uploadTour } from "./helpers";
import InputNumeric from "./fomr_elements/InputNumeric";
import InputText from "./fomr_elements/InputText";
//

export default function CardEditorForm({ updateCardDate }) {
  const stubIKUpload = React.useRef();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isImageUploaded, setIsImageUploaded] = React.useState(false);
  const [isCardUploaded, setIsCardUploaded] = React.useState(false);

  const cardID = window.location.pathname.match(/(?<=edit\/)\d*/);
  const strictValidation = false;

  const countriesOptions = [];

  for (let country in COUNTRIES) {
    countriesOptions.push(
      <option key={country} value={country}>
        {COUNTRIES[country]}
      </option>
    );
  }

  const [formData, setFormData] = React.useState({
    thumbnailSrc: "",
    countryKey: "",
    duration: "",
    popularity: "",
    city: "",
    rating: "",
    country: "",
    priceOriginal: "",
    priceOffered: "",
    details: new LoremIpsum().generateWords(18),
    poi: "center",
    thumbnailID: "",
    // id: "",
  });

  const formValidation = {
    city: {
      type: "string",
      property: "city",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkStringLength(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      validation: { max: 20 },
    },
    duration: {
      type: "number",
      property: "duration",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkNumberRange(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      validation: {
        min: 1,
        max: 120,
        fraction: false,
        allowHaves: false,
      },
    },
    popularity: {
      type: "number",
      property: "popularity",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkNumberRange(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      validation: {
        min: 0,
        max: 1_000_000,
        fraction: false,
        allowHaves: false,
      },
    },
    rating: {
      type: "number",
      property: "rating",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkNumberRange(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      validation: {
        min: 0.5,
        max: 5,
        fraction: false,
        allowHaves: true,
      },
    },
    priceOriginal: {
      type: "number",
      property: "priceOriginal",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkNumberRange(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      value: function () {
        return formData[this.property];
      },
      
      isValid: function () {
        if(this.validate) return this.validate(this.type, this.value(), this.validation)
        return validate(this.type, this.value(), this.validation);
      },
      validation: {
        min: 150,
        max: 10_000,
        fraction: false,
        allowHaves: false,
      },
    },
    priceOffered: {
      type: "number",
      property: "priceOffered",
      validate: function (strict = false) {
        const value = formData[this.property];
        console.log(formValidation.priceOriginal.isValid());
        if (
          !formValidation.priceOriginal.isValid()
      )
          return false;
        return (
          checkNumberRange(value, this.validation) || checkEmpty(value, strict)
        );
      },
      validationMessage: function () {
        if (
            !formValidation.priceOriginal.isValid()
        )
          return undefined;

        return "Please enter a valid price in the previous filed first. (Price Offered)";
      },
      validation: {
        min: 100,
        max: formData.priceOriginal - 1,
        fraction: false,
        allowHaves: false,
      },
    },
    details: {
      type: "string",
      property: "details",
      //   validate: function (strict = false) {
      //     const value = formData[this.property];
      //     return (
      //       checkStringLength(value, this.validation) || checkEmpty(value, strict)
      //     );
      //   },
      //   validationMessage: "",
      validation: { min: 30, max: 150 },
    },
  };

  const formBasicInputs = [];
  for (let fieldKey in formValidation) {
    const field = formValidation[fieldKey];
    const props = {
      label: fieldKey,
      id: "inputTour_" + fieldKey,
      isValid:
        field.validate?.() ??
        validate(field.type, formData[fieldKey], field.validation),
      invalidFeedback:
        field.validationMessage?.() ??
        defaultValidationMessage(field.type, field.validation),
      control: [formData[fieldKey], (value) => updateFormData(fieldKey, value)],
    };

    if (field.type === "string")
      formBasicInputs.push(<InputText {...props} key={props.id} />);
    if (field.type === "number")
      formBasicInputs.push(<InputNumeric {...props} key={props.id} />);
  }

  return (
    <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
      {formBasicInputs}
    </form>
  );
  ////

  /* Old Code 
  //   function triggerErrorsForEmptyFields() {
  //     let isValidForm = true;
  //     for (let key in formData) {
  //       if (key === "thumbnailID") continue;
  //       if (!formData[key]) {
  //         console.log(key, formData[key]);
  //         updateFormErrors(key, true);
  //         isValidForm = false;
  //       }
  //     }
  //     return isValidForm;
  //   }

  //   async function uploadImage() {
  //     const files = stubIKUpload.current.files;
  //     if (!files) return;

  //     const ikupload = document.querySelector("#ikupload > input");
  //     ikupload.files = files;
  //     ikupload.dispatchEvent(new Event("change", { bubbles: true }));
  //   }

  //   function onUploadProgress(progress) {
  //     setUploadProgress(progress.loaded / progress.total);
  //   }

  //   function validateImageFile(file) {
  //     if (!file) return false;
  //     if (!REGEX_IMG_TYPE.test(file.type)) return false;
  //     if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;

  //     return true;
  //   }

  //   function handleImageChange(event) {
  //     const file = event.target.files[0];
  //     const isValid = validateImageFile(file);
  //     updateFormErrors("thumbnailSrc", !isValid);

  //     if (!isValid) return;

  //     const fileReader = new FileReader();

  //     fileReader.onload = function (event) {
  //       const img = event.target.result;
  //       updateFormData("thumbnailSrc", img);
  //       updateFormData("thumbnailID", "");
  //     };

  //     fileReader.readAsDataURL(file);
  //   }
  //
  //   function updateFormErrors(key, value) {
  //     setFormErrors(function (prev) {
  //       return {
  //         ...prev,
  //         [key]: value,
  //       };
  //     });
  //   }

  //   function checkFormErrors() {
  //     for (let key in formErrors) {
  //       if (formErrors[key]) return true;
  //     }

  //     return false;
  //   }
  //
  //   function isWithinRange(
  //     value,
  //     min,
  //     max,
  //     // acceptEmpty = true,
  //     allowFraction = false,
  //     allowHalves = false
  //   ) {
  //     const debug = false;
  //     value = value.toString();
  //     min = +min;
  //     max = +max;
  //     debug && console.log(value);

  //     // terminate if min or max are not numbers
  //     if (isNaN(min) || isNaN(max)) return false;

  //     // debug && console.log(1);
  //     // // terminate if the value is empty
  //     // if (!value) return acceptEmpty;

  //     if (value === "") return true;

  //     debug && console.log(2);
  //     // terminate if the value is not a number
  //     if (Number.isNaN(Number(value))) return false;

  //     debug && console.log(3);
  //     // terminate if number is outside range
  //     if (value < min) return false;

  //     debug && console.log(4);
  //     //terminate if number is outside range
  //     if (value > max) return false;

  //     let fractionPart = Number(value.split(".")[1]);

  //     debug && console.log(5);
  //     //terminate if fractions are not allow but halves are, and the fraction part is neither empty nor 0.5
  //     if (allowHalves && !allowFraction)
  //       return fractionPart ? fractionPart === 5 : true;

  //     debug && console.log(6);
  //     //terminate if fractions are not allowed and there is a fraction part
  //     if (!allowFraction) return fractionPart ? fractionPart === 0 : true;

  //     return true;
  //   }
*/

  async function handleSubmit(event) {
    // event.preventDefault();
    // let isValidForm = triggerErrorsForEmptyFields();
    // console.table({ isValidForm });
    // if (!isValidForm) return;
    // if (!formData.thumbnailID) uploadImage();
    // else setIsImageUploaded(true);
  }
  function updateFormData(key, value) {
    setFormData(function (prev) {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function checkNumberRange(value, validation) {
    const debug = false;
    let { min, max, fraction, allowHalves } = validation;
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

  function checkStringLength(string, validation) {
    const stringLength = string.length;
    if (stringLength === undefined) return false;
    const { min = 1, max } = validation;

    if (min) if (stringLength < min) return false;
    if (max) if (stringLength > max) return false;

    return true;
  }

  function defaultValidationMessage(type, validation) {
    if (type === "string") return defStringValidationMsg(validation);
    if (type === "number") return defNumberValidationMsg(validation);
  }

  function defNumberValidationMsg(validation) {
    const { min, max } = validation;
    let validationMessage = `Please enter a number between ${addSeparator(
      min
    )} and ${addSeparator(max)}`;

    if (!validation.fraction) validationMessage += ", no decimals are allowed";

    if (validation.allowHalves) validationMessage += " only haves (i.e. 2.5)";

    validationMessage += ".";
    return validationMessage;
  }

  function defStringValidationMsg(validation) {
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

  function checkEmpty(value, strict) {
    if (strict) return false;
    return value === "";
  }

  function validate(type, value, validation) {
    if (type === "string") return validateString(value, validation);
    if (type === "number") return validateNumber(value, validation);
  }

  function validateString(value, validation) {
    return (
      checkStringLength(value, validation) ||
      checkEmpty(value, strictValidation)
    );
  }

  function validateNumber(value, validation) {
    return (
      checkNumberRange(value, validation) || checkEmpty(value, strictValidation)
    );
  }
}