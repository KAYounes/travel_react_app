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
import
  {
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
import
  {
    checkFileExist,
    checkIsBlank,
    convertImageToString,
    defaultValidationMessage,
    validate,
    validateNumber,
  } from "./helpers";
import InputSelect from "./fomr_elements/InputSelect";
import { SLFunctionRequest, getFromDatabase, postToDatabase } from "../../fetch.helpers";
import InputRadio from "./fomr_elements/InputRadio";
//

let CardEditorFormRenders = 0;

export default function CardEditorForm({
  formData,
  updateFormData,
  formState,
  // editingMode,
  // cardUploadSuccessful,
  // _readyToPost,
  _submitForm,
  _uploadProgress,
  // _secondaryUpload,
  // _needToUploadImage
})
{
  // console.log("RENDERING > CardEditorForm: ", ++CardEditorFormRenders);
  
  const stubIKUpload = React.useRef();
  const uploadProgress = _uploadProgress
  const [submitForm, setSubmitForm] = _submitForm //React.useState(false);
  // const [readyToPost, setReadyToPost] = _readyToPost
  // const [needToUploadImage, setNeedToUploadImage] = _needToUploadImage //React.useState(true)

  const formFieldsSchema = [
    {
      property: "thumbnail",
      disabled: submitForm,
      type: "imageUpload",
      isValid: function ()
      {
        const value = this.value();
        if (!value?.length ?? true) return true;

        if (value instanceof FileList)
        {
          return this.validateFileAsImage(value[0]);
        }

        return this.validateURL(value);
      },
      validateFileAsImage: function (file)
      {
        if (!file) return false;
        if (!/image\/*/.test(file.type)) return false;
        if (file.size > MAX_IMG_SIZE_BYTES) return false;

        return true;
      },
      validateURL: function (str)
      {
        try
        {
          const url = new URL(str);
          return /^https:\/\/images.unsplash.com\/photo.+/.test(url.toString());
        } catch {
          return false;
        }
      },
      invalidFeedback: function ()
      {
        if (this.value() instanceof FileList)
        {
          return INVALID_IMAGE_FEEDBACK;
        }

        return INVALID_URL_FEEDBACK;
      },
    },
    {
      property: "poi",
      type: "radio",
      label: "Thumbnail Alignment",
      required: false,
    },
    {
      property: "countryKey",
      type: "select",
      label: "Country",
      required: true,
    },
    {
      property: "city",
      type: "text",
      validation: { max: 20 },
    },
    {
      property: "duration",
      type: "numeric",
      validation: { min: MIN_DURATION, max: MAX_DURATION },
      suffix: "days",
    },
    {
      property: "popularity",
      type: "numeric",
      validation: { max: MAX_POPULARITY },
      suffix: "people",
      asDecimal: true,
    },
    {
      property: "rating",
      type: "numeric",
      validation: { min: 0.5, max: 5, allowHalves: true },
      suffix: <i className='bi bi-star-fill text-warning'></i>,
    },
    {
      property: "priceOriginal",
      type: "numeric",
      validation: { min: 150, max: MAX_PRICE },
      suffix: "$",
    },
    {
      property: "priceOffered",
      type: "numeric",
      isOriginalPriceValid: function ()
      {
        return formState["priceOriginal"].value() && formState["priceOriginal"].isValid;
      },
      isValid: function ()
      {
        if (!this.isOriginalPriceValid()) return false;

        return validateNumber(this.value(), this.validation);
      },
      invalidFeedback: function ()
      {
        if (this.isOriginalPriceValid()) return undefined;

        return "Please enter a valid original price. (I.e. the previous field)";
      },
      validation: { min: 100, max: Math.floor(formData?.priceOriginal * 0.95) },
      suffix: "$",
    },
    {
      property: "details",
      disabled: submitForm,
      type: "text",
      validation: { min: MIN_DETAILS_LENGTH, max: MAX_DETAILS_LENGTH },
      largeText: true,
    },
  ];

  formFieldsSchema.map(function (fieldData)
  {
    return (formState[fieldData.property] = new FormField(fieldData));
  });

  const formFieldsDOM = formFieldsSchema.map(function (fieldData)
  {
    const field = { ...formState[fieldData.property], disabled: submitForm };

    if (field.type === "text")
    {
      return <InputText key={field.id} {...field} />;
    }

    if (field.type === "numeric")
    {
      return <InputNumeric key={field.id} {...field} />;
    }

    if (field.type === "imageUpload")
    {
      return <InputImage key={field.id} {...field} />;
    }

    if (field.type === "radio")
    {
      return <InputRadio key={field.id} {...field} />;
    }

    if (field.type === "select")
    {
      return <InputSelect key={field.id} {...field} />;
    }
  });

  // React.useEffect(function(){
  //   setUploadProgress(0)
  //   setSubmitForm(false)
  //   // setSecondaryUpload()
  // },[cardUploadSuccessful])

  return (
    <>
      <form className='d-flex flex-column gap-7' onSubmit={handleSubmit}>
        {
          formFieldsDOM
        }

        {/* <div id='ikupload' className='d-none h-0'>
          <IKUpload
            style={{ display: "none", pointerEvents: "none" }}
            onUploadProgress={onUploadProgress}
            onSuccess={onSuccess}
            onError={onError}
            overwriteFile={true}
            useUniqueFileName={false}
            folder='tours'
          />
        </div> */}
        <button
          className='form-control position-relative'
          disabled={!isFormValidCheck() || submitForm}
        >
          <div
            className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
            style={{ backgroundColor: "transparent" }}
          >
            <div
              className='progress-bar '
              style={{
                width: `${Math.max(
                  // (cardUploadSuccessful  === true) * 100,
                  // readyToPost * 90,
                  submitForm * 10 + uploadProgress * 80,
                )}%`,
                zIndex: -1,
                backgroundColor: '#bce784'
                  // cardUploadSuccessful === false ? "#E88484" : "#bce784",
              }}
            ></div>
          </div>
          <div className='position-relative z-1'>
            Upload
            {/* {cardUploadSuccessful ? 'Modify' : submitForm ? "uploading" : "upload"} */}
          </div>
        </button>
      </form>
    </>
  );

  function isFormValidCheck()
  {
    return true
    // if (editingMode) return true;

    for (let fieldProperty in formState)
    {
      // console.log({
      //   invalid: !formState[fieldProperty].isValid || formState[fieldProperty].isBlank,
      //   fieldProperty,
      //   "formState[fieldProperty].isValid": formState[fieldProperty].isValid,
      //   "formState[fieldProperty].isBlank": formState[fieldProperty].isBlank,
      // });
      if (!formState[fieldProperty].isValid || formState[fieldProperty].isBlank) return false;
    }

    return true;
  }

  async function handleSubmit(event)
  {
    event.preventDefault();
    setSubmitForm(true);

    // case 1 - this is a new card => no card url or card id
    // case 2 - this is an old card => user dose not upload a new image
    // case 3 - this is an old ard => user uploads a new image

    // if(needToUploadImage) 
    // {
    //   uploadImage();
    //   setNeedToUploadImage(false)
    // }
  }

  async function uploadImage()
  {
    const value = formData.thumbnail;

    // console.log({
    //   if_1: editingMode && !value,
    //   if_2: value instanceof FileList,
    //   editingMode,
    //   value,
    // });

    if (value instanceof FileList)
    {
      const ikupload = document.querySelector("#ikupload > input");
      ikupload.files = value;
      ikupload.dispatchEvent(new Event("change", { bubbles: true }));
    } else
    {
      uploadImageURL(value);
    }
  }

  function uploadImageURL(url)
  {
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
  }

  // function onUploadProgress(event)
  // {
  //   console.log("onUploadProgress >>>", event);
  //   setUploadProgress(event.loaded / event.total);
  // }

  // function onError(event)
  // {
  //   console.log("onError >>>", event);
  // }

  // function onSuccess(response)
  // {
  //   console.log("onSuccess >>>", response);
  //   updateFormData("thumbnailID", response.fileId);
  //   updateFormData("thumbnailURL", response.filePath);
  // }

  function FormField({
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
    asDecimal = true,
    required = true,
    disabled = false,
    validation,
    ...other
  })
  {
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

    for (let otherProperties in other)
    {
      this[otherProperties] = other[otherProperties];
    }

    this.label = label;
    if (this.label === undefined) this.label = property.split(/(?=[A-Z])/).join(" ");

    this.isBlank = isBlank?.bind?.(this)();
    if (this.isBlank === undefined) this.isBlank = checkIsBlank(value);

    this.invalidFeedback = invalidFeedback?.bind?.(this)();
    if (this.invalidFeedback === undefined)
      this.invalidFeedback = defaultValidationMessage(type, validation);

    this.isValid = isValid?.bind?.(this)();
    if (this.isValid === undefined) this.isValid = validate(type, this.value(), validation);

    this.control = [formData[property], (value) => updateFormData(property, value)];
  }
}
