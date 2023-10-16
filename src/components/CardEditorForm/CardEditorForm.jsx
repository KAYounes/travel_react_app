/* eslint-disable react/prop-types */
import React, { StrictMode } from "react";
import clsx from "clsx";
import { IKImage, IKUpload } from "imagekitio-react";
import { LoremIpsum } from "lorem-ipsum";
import { Toast } from "bootstrap";
import { useNavigate } from "react-router-dom";
//
// import styles from "./styles.module.css";
// import StarRating from "../ui_components/StarRating/StarRating";
import InputNumeric from "./fomr_elements/InputNumeric";
import InputText from "./fomr_elements/InputText";
import InputImage from "./fomr_elements/InputImage";
//
import {
  COUNTRIES,
  INVALID_IMAGE_FEEDBACK,
  INVALID_URL_FEEDBACK,
  MAX_DETAILS_LENGTH,
  MAX_DURATION,
  MAX_IMG_SIZE_BYTES,
  MAX_POPULARITY,
  MAX_PRICE,
  MIN_DETAILS_LENGTH,
  MIN_DURATION,
} from "./constants";
import {
  checkFileExist,
  checkIsBlank,
  convertImageToString,
  defaultValidationMessage,
  validate,
  validateNumber,
} from "./helpers";
import InputSelect from "./fomr_elements/InputSelect";
import {
  SLFunctionRequest,
  getFromDatabase,
  postToDatabase,
} from "../../fetch.helpers";
import InputRadio from "./fomr_elements/InputRadio";
//

export default function CardEditorForm({ updateCardData, cardData }) {
  console.log("RENDERING > CardEditorForm");
  const stubIKUpload = React.useRef();
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isImageUploaded, setIsImageUploaded] = React.useState(false);
  const [isCardUploaded, setIsCardUploaded] = React.useState(false);
  const [strictCheck, setStrictCheck] = React.useState(false);
  const [uploadStart, setUploadStart] = React.useState(false);
  const toastRef = React.useRef();
  const navigator = useNavigate();
  const editMode = cardData?.id;
  
  //
  // const cardID = window.location.pathname.match(/(?<=edit\/)\d*/);
  // const strictValidation = false;
  //
  
  
  console.log('cardData', cardData)
  console.log('editMode', editMode)

  const loadDefault = React.useCallback(function  () {
    console.log('loadDefault')
    const cardID = window.location.pathname.match(/(?<=edit\/)\d+/);

    let defaultVal = {
      countryKey: "egypt",
      duration: "32",
      popularity: "231312",
      city: new LoremIpsum().generateWords(2),
      rating: "4",
      priceOriginal: "1200",
      priceOffered: "200",
      details: new LoremIpsum().generateWords(18),
      poi: "center",
      thumbnail: "",
      thumbnailURL: "",
    }

    getFromDatabase({id: cardID[0]}).then(function(r){
      console.log('r', r[0])
      return r
    })

    if (editMode) {
      for (let key in defaultVal) {
        if (cardData[key]) defaultVal[key] = cardData[key];
      }

      defaultVal["thumbnailURL"] = cardData["thumbnailURL"];
    }

    return defaultVal;
  }, [editMode, cardData])


  const [formData, setFormData] = React.useState(loadDefault);
  // ({
  //   countryKey: "",
  //   duration: "",
  //   popularity: "",
  //   city: "",
  //   rating: "",
  //   priceOriginal: "",
  //   priceOffered: "",
  //   details: new LoremIpsum().generateWords(18),
  //   poi: "",
  //   thumbnail: "",
  // });


  // console.log("formData", formData);
  // console.log("cardData", cardData);

  // React.useEffect(function () {
  //   setFormData(loadDefault);
  // }, []);

  // function loadDefault() {
  //   console.log('loadDefault')
  //   let defaultVal = {
  //     countryKey: "egypt",
  //     duration: "32",
  //     popularity: "231312",
  //     city: "my am me",
  //     rating: "4",
  //     priceOriginal: "1200",
  //     priceOffered: "200",
  //     details: new LoremIpsum().generateWords(18),
  //     poi: "center",
  //     thumbnail: "",
  //   };

  //   if (editMode) {
  //     for (let key in defaultVal) {
  //       if (cardData[key]) defaultVal[key] = cardData[key];
  //     }

  //     defaultVal["thumbnail"] = cardData["thumbnailURL"];
  //   }

  //   return defaultVal;
  // }

  // React.useEffect(function () {
  //   if (editMode) {
  //     for (let key in formData) {
  //       if (cardData[key]) updateFormData(key, cardData[key]);
  //     }
  //   }
  // }, []);

  // const cardData = {}
  // const [cardData, setCardData] = React.useState({})

  const formFieldsData = [
    {
      property: "thumbnail",
      disabled: uploadStart,
      type: "imageUpload",
      isValid: function () {
        const value = this.value();
        // console.log(value)
        if (!value?.length ?? true) return true;

        if (value instanceof FileList) {
          return this.validateFileAsImage(value[0]);
        }

        return this.validateURL(value);
      },
      validateFileAsImage: function (file) {
        if (!file) return false;
        if (!/image\/*/.test(file.type)) return false;
        if (file.size > MAX_IMG_SIZE_BYTES) return false;

        return true;
      },
      validateURL: function (str) {
        try {
          const url = new URL(str);
          return /^https:\/\/images.unsplash.com\/photo.+/.test(url.toString());
        } catch {
          return false;
        }
      },
      invalidFeedback: function () {
        if (this.value() instanceof FileList) {
          return INVALID_IMAGE_FEEDBACK;
        }

        return INVALID_URL_FEEDBACK;
      },
      isBlank: function () {
        if (editMode) return false;

        const value = this.value()

        return checkIsBlank(value)
      },
    },
    {
      property: "poi",
      // disabled: uploadStart,
      type: "radio",
      label: "Thumbnail Alignment",
      required: false,
    },
    {
      property: "countryKey",
      // disabled: uploadStart,
      type: "select",
      label: "Country",
      required: true,
    },
    {
      property: "city",
      // disabled: uploadStart,
      type: "text",
      validation: { max: 20 },
    },
    {
      property: "duration",
      // disabled: uploadStart,
      type: "numeric",
      validation: { min: MIN_DURATION, max: MAX_DURATION },
      suffix: "days",
    },
    {
      property: "popularity",
      // disabled: uploadStart,
      type: "numeric",
      validation: { max: MAX_POPULARITY },
      suffix: "people",
      asDecimal: true,
    },
    {
      property: "rating",
      // disabled: uploadStart,
      type: "numeric",
      validation: { min: 0.5, max: 5, allowHalves: true },
      suffix: <i className="bi bi-star-fill text-warning"></i>,
    },
    {
      property: "priceOriginal",
      // disabled: uploadStart,
      type: "numeric",
      validation: { min: 150, max: MAX_PRICE },
      suffix: "$",
    },
    {
      property: "priceOffered",
      // disabled: uploadStart,
      type: "numeric",
      isOriginalPriceValid: function () {
        return (
          formFields["priceOriginal"].value() &&
          formFields["priceOriginal"].isValid
        );
      },
      isValid: function () {
        if (!this.isOriginalPriceValid()) return false;

        return validateNumber(this.value(), this.validation, strictCheck);
      },
      invalidFeedback: function () {
        if (this.isOriginalPriceValid()) return undefined;

        return "Please enter a valid original price. (I.e. the previous field)";
      },
      validation: { min: 100, max: Math.floor(formData.priceOriginal * 0.95) },
      suffix: "$",
    },
    {
      property: "details",
      disabled: uploadStart,
      type: "text",
      validation: { min: MIN_DETAILS_LENGTH, max: MAX_DETAILS_LENGTH },
      largeText: true,
    },
  ];

  const formFields = {};
  formFieldsData.map(function (fieldData) {
    return (formFields[fieldData.property] = new BasicFormField(fieldData));
  });

  const formFieldsDOM = formFieldsData.map(function (fieldData) {
    const field = { ...formFields[fieldData.property], disabled: uploadStart };

    if (field.type === "text") {
      return <InputText key={field.id} {...field} />;
    }

    if (field.type === "numeric") {
      return <InputNumeric key={field.id} {...field} />;
    }

    if (field.type === "imageUpload") {
      return <InputImage key={field.id} {...field} />;
    }

    if (field.type === "radio") {
      return <InputRadio key={field.id} {...field} />;
    }

    if (field.type === "select") {
      return <InputSelect key={field.id} {...field} />;
    }
  });

  React.useEffect(
    function () {
      resolveUpdates();
    },
    [formData]
  );

  React.useEffect(
    function () {
      if (!isImageUploaded) return;

      postToDatabase(cardData).then(function (r) {
        // console.log({r})
        setIsCardUploaded(true);
        navigator("./" + r.id, { replace: true });
      });
    },
    [isImageUploaded]
  );

  return (
    <>
      <form className="d-flex flex-column gap-7" onSubmit={handleSubmit}>
        {formFieldsDOM}
        <div id="ikupload" className="d-none h-0">
          <IKUpload
            style={{ display: "none", pointerEvents: "none" }}
            onUploadProgress={onUploadProgress}
            onSuccess={onSuccess}
            onError={onError}
            overwriteFile={true}
            useUniqueFileName={false}
            folder="tours"
            // webhookUrl="/.netlify/functions/slf"
          />
        </div>
        <button
          className="form-control position-relative"
          disabled={!isFormValidCheck() || uploadStart}
          onClick={() => Toast.getOrCreateInstance(toastRef.current).show()}
        >
          <div
            className="progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0"
            style={{ backgroundColor: "transparent" }}
          >
            <div
              className="progress-bar "
              style={{
                width: `${Math.max(
                  isCardUploaded * 100,
                  isImageUploaded * 90,
                  uploadStart * 10 + uploadProgress * 80
                )}%`,
                zIndex: -1,
                backgroundColor: "#bce784",
              }}
            ></div>
          </div>
          <div className="position-relative z-1">
            {uploadStart ? "uploading" : "upload"}
          </div>
        </button>
      </form>

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast" ref={toastRef}>
          <div className="toast-header" style={{ backgroundColor: "#F8EDFF" }}>
            <strong className="me-auto" style={{ color: "#400057" }}>
              <i className="bi bi-bell-fill me-2"></i>
              Updates
            </strong>
            <span className="text-muted">
              {new Date().toLocaleTimeString("en-us", {
                hour12: false,
                seconds: false,
                timeStyle: "short",
              })}
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
            ></button>
          </div>
          <div className="toast-body">
            <i
              className="bi bi-check-square-fill fs-6 me-2"
              style={{ color: "#8AFF84" }}
            ></i>
            Upload has started
          </div>
        </div>
      </div>
    </>
  );

  function isFormValidCheck() {
    for (let fieldProperty in formFields) {
      if (
        !formFields[fieldProperty].isValid ||
        formFields[fieldProperty].isBlank
      )
        return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event?.preventDefault();
    setUploadStart(true);
    uploadImage();
  }

  async function uploadImage() {
    const value = formData.thumbnail;
    if(!value){
      setIsImageUploaded(true)
    }
    else if (value instanceof FileList) {
      const ikupload = document.querySelector("#ikupload > input");
      ikupload.files = value;
      ikupload.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      let r1 = uploadImageURL(value);
    }
  }

  function uploadImageURL(url) {
    SLFunctionRequest({
      params: {
        action: "upload",
        file: url,
        fileName: "unsplash_" + url.match(/photo-[a-z0-9-]*/)[0],
        folder: "tours",
        useUniqueFileName: false,
        overwriteFile: true,
      },
    })
      .then((r2) => r2.json())
      .then((r3) => onSuccess(r3));
    // console.log({r1})
  }

  function updateFormData(key, value) {
    setFormData(function (prev) {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function onUploadProgress(event) {
    console.log("onUploadProgress >>>", event);
    setUploadProgress(event.loaded / event.total);
  }

  function onError(event) {
    console.log("onError >>>", event);
  }

  function onSuccess(response) {
    console.log("onSuccess >>>", response);
    updateCardData("thumbnailID", response.fileId);
    updateCardData("thumbnailURL", response.filePath);
    setIsImageUploaded(true);
  }

  function BasicFormField({
    type,
    property,
    prefix,
    suffix,
    name,
    hint,
    invalidFeedback,
    isValid,
    label,
    isBlank,
    largeText = false,
    asDecimal = false,
    required = true,
    disabled = false,
    validation,
    ...other
  }) {
    const value = formData[property];
    this.asDecimal = asDecimal;
    this.disabled = disabled;
    this.hint = hint;
    this.id = `${property}Input`;
    this.largeText = largeText;
    this.name = name;
    this.prefix = prefix;
    this.property = property;
    this.required = required;
    this.suffix = suffix;
    this.type = type;
    this.validation = validation;
    this.value = () => value;

    for (let otherProperties in other) {
      this[otherProperties] = other[otherProperties];
    }

    this.label = label;
    if (this.label === undefined)
      this.label = property.split(/(?=[A-Z])/).join(" ");

    // this.isBlank = value?.length ?? true;

    this.isBlank = isBlank?.bind?.(this)();
    if (this.isBlank === undefined) this.isBlank = checkIsBlank(value)

    this.invalidFeedback = invalidFeedback?.bind?.(this)();
    if (this.invalidFeedback === undefined)
      this.invalidFeedback = defaultValidationMessage(type, validation);

    this.isValid = isValid?.bind?.(this)();
    if (this.isValid === undefined)
      this.isValid = validate(type, this.value(), validation, strictCheck);

    this.control = [
      formData[property],
      (value) => updateFormData(property, value),
    ];
  }

  async function resolveUpdates() {
    for (let fieldProperty in formFields) {
      const value = formData[fieldProperty];

      if (!formFields[fieldProperty].isValid)
        updateCardData(fieldProperty, null);
      else {
        // console.log(fieldProperty, value ? { value } : "-");
        switch (fieldProperty) {
          case "thumbnail":
            // console.log(value, editMode)
            if (!value && editMode) {
              updateCardData("thumbnailURL", formData.thumbnailURL);
            } else if (checkFileExist(value))
              await convertImageToString(value[0]).then((img) =>
                updateCardData("thumbnailURL", img)
              );
            else updateCardData("thumbnailURL", value);
            break;

          case "countryKey":
            updateCardData("countryKey", value);
            updateCardData("country", COUNTRIES[value]);
            break;

          default:
            updateCardData(fieldProperty, value);
            break;
        }
      }
    }
  }
}
