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
  editingMode,
  cardUploadSuccessful,
  _readyToPost,
  _secondaryUpload
})
{
  // console.log("RENDERING > CardEditorForm: ", ++CardEditorFormRenders);
  
  const stubIKUpload = React.useRef();
  
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadStart, setUploadStart] = React.useState(false);
  const [readyToPost, setReadyToPost] = _readyToPost
  const [secondaryUpload, setSecondaryUpload] = _secondaryUpload

  // const [isImageUploaded, setIsImageUploaded] = React.useState(false);
  // const [isCardUploaded, setIsCardUploaded] = React.useState(false);

  // if (isImageUploaded)
  // {
  //   console.log('uploading to database')
  //   postToDatabase().then(function (r) {
  //     // console.log({r})
  //     setIsCardUploaded(true);
  //     navigator("./" + r.id, { replace: true });
  //   });
  // }

  const formFieldsSchema = [
    {
      property: "thumbnail",
      disabled: uploadStart,
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
      // isBlank: function () {
      //   if (editMode) return false;

      //   const value = this.value()

      //   return checkIsBlank(value)
      // },
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
      suffix: <i className='bi bi-star-fill text-warning'></i>,
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
      disabled: uploadStart,
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
    const field = { ...formState[fieldData.property], disabled: uploadStart };

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

  // React.useEffect(function ()
  // {
  //   if(!editingMode) return
  //   setUploadProgress(0)
  //   setUploadStart(false)
  // }, [editingMode]);

  // React.useEffect(
  //   function () {
  //     // if (!isImageUploaded) return;

  //     // postToDatabase(cardData).then(function (r) {
  //     //   // console.log({r})
  //     //   setIsCardUploaded(true);
  //     //   navigator("./" + r.id, { replace: true });
  //     // });
  //   },
  //   [isImageUploaded]
  // );

  // console.log({
  //   'cardUploadSuccessful * 100': cardUploadSuccessful * 100,
  //   'readyToPost * 90': readyToPost * 90,
  //   'uploadStart * 10 + uploadProgress * 80': uploadStart * 10 + uploadProgress * 80,
  //   'Math.max(cardUploadSuccessful * 100,readyToPost * 90,uploadStart * 10 + uploadProgress * 80,': Math.max(
  //     cardUploadSuccessful === true * 100,
  //     readyToPost * 90,
  //     uploadStart * 10 + uploadProgress * 80,
  //   ),
  //   cardUploadSuccessful,
  //   readyToPost,
  //   uploadStart,
  //   uploadProgress,
  // })

  React.useEffect(function(){
    setUploadProgress(0)
    setUploadStart(false)
    // setSecondaryUpload()
  },[cardUploadSuccessful])

  return (
    <>
      <form className='d-flex flex-column gap-7' onSubmit={handleSubmit}>
        {formFieldsDOM}
        <div id='ikupload' className='d-none h-0'>
          <IKUpload
            style={{ display: "none", pointerEvents: "none" }}
            onUploadProgress={onUploadProgress}
            onSuccess={onSuccess}
            onError={onError}
            overwriteFile={true}
            useUniqueFileName={false}
            folder='tours'
          // webhookUrl="/.netlify/functions/slf"
          />
        </div>
        <button
          className='form-control position-relative'
          disabled={!isFormValidCheck() || uploadStart}
        // onClick={() => Toast.getOrCreateInstance(toastRef.current).show()}
        >
          <div
            className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
            style={{ backgroundColor: "transparent" }}
          >
            <div
              className='progress-bar '
              style={{
                width: `${Math.max(
                  (cardUploadSuccessful  === true) * 100,
                  readyToPost * 90,
                  uploadStart * 10 + uploadProgress * 80,
                )}%`,
                zIndex: -1,
                backgroundColor:
                  cardUploadSuccessful === false ? "#E88484" : "#bce784",
              }}
            ></div>
          </div>
          <div className='position-relative z-1'>
            {cardUploadSuccessful ? 'Modify' : uploadStart ? "uploading" : "upload"}
          </div>
        </button>
      </form>
    </>
  );

  function isFormValidCheck()
  {
    if (editingMode) return true;

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
    event?.preventDefault();
    setUploadStart(true);
    uploadImage();
  }

  async function uploadImage()
  {
    const value = formData.thumbnail;
    console.log({
      if_1: editingMode && !value,
      if_2: value instanceof FileList,
      editingMode,
      value,
    });

    if (editingMode && !value)
    {
      setSecondaryUpload(true);
    } else if (value instanceof FileList)
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

  // function updateFormData(key, value) {
  //   // setFormData(function (prev) {
  //   //   return {
  //   //     ...prev,
  //   //     [key]: value,
  //   //   };
  //   // });
  // }

  function onUploadProgress(event)
  {
    console.log("onUploadProgress >>>", event);
    setUploadProgress(event.loaded / event.total);
  }

  function onError(event)
  {
    console.log("onError >>>", event);
  }

  function onSuccess(response)
  {
    console.log("onSuccess >>>", response);
    updateFormData("thumbnailID", response.fileId);
    updateFormData("thumbnailURL", response.filePath);
    // setReadyToPost(true);
    if(editingMode){
      setSecondaryUpload(true)
    }
  }

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

    // this.isBlank = value?.length ?? true;

    this.isBlank = isBlank?.bind?.(this)();
    if (this.isBlank === undefined) this.isBlank = checkIsBlank(value);

    this.invalidFeedback = invalidFeedback?.bind?.(this)();
    if (this.invalidFeedback === undefined)
      this.invalidFeedback = defaultValidationMessage(type, validation);

    this.isValid = isValid?.bind?.(this)();
    if (this.isValid === undefined) this.isValid = validate(type, this.value(), validation);

    this.control = [formData[property], (value) => updateFormData(property, value)];
  }

  async function resolveUpdates()
  {
    // for (let fieldProperty in formState) {
    //   const value = cardData[fieldProperty];
    //   if (!formState[fieldProperty].isValid)
    //     updateCardData(fieldProperty, null);
    //   else {
    //     // console.log(fieldProperty, value ? { value } : "-");
    //     switch (fieldProperty) {
    //       case "thumbnail":
    //         // console.log(value, editMode)
    //         if (!value) {
    //           updateCardData("thumbnailURL", cardData.thumbnailURL);
    //         } else if (checkFileExist(value))
    //           await convertImageToString(value[0]).then((img) =>
    //             updateCardData("thumbnailURL", img)
    //           );
    //         else updateCardData("thumbnailURL", value);
    //         break;
    //       case "countryKey":
    //         updateCardData("countryKey", value);
    //         updateCardData("country", COUNTRIES[value]);
    //         break;
    //       default:
    //         updateCardData(fieldProperty, value);
    //         break;
    //     }
    //   }
    // }
  }
}
