/* eslint-disable react/prop-types */
import React from "react";
import
  {
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
import InputImage from "./fomr_elements/InputImage";
import InputNumeric from "./fomr_elements/InputNumeric";
import InputRadio from "./fomr_elements/InputRadio";
import InputSelect from "./fomr_elements/InputSelect";
import InputText from "./fomr_elements/InputText";
import { checkIsBlank, defaultValidationMessage, validate, validateNumber } from "./helpers";
//
//
///
export default function CardEditorForm({
  // PROPS
  formData,
  updateFormData,
  _uploadProgress,
  formState,
})
{
  const uploadProgress = _uploadProgress;
  const uploading = uploadProgress > 0 && uploadProgress < 1;
  // const formState = {};

  const formFieldsSchema = [
    {
      property: "thumbnail",
      disabled: uploading,
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
      disabled: uploading,
      type: "text",
      validation: { min: MIN_DETAILS_LENGTH, max: MAX_DETAILS_LENGTH },
      largeText: true,
    },
  ];

  formFieldsSchema.map(function (fieldSchema)
  {
    return (formState[fieldSchema.property] = new FormField(fieldSchema));
  });

  const formFieldsDOM = formFieldsSchema.map(function (fieldData)
  {
    // console.log(fieldData.property)
    // console.log(formState[fieldData.property])
    const field = { ...formState[fieldData.property], disabled: uploading };

    if (field.type === "text")
    {
      return (
        <InputText
          key={field.id}
          {...field}
        />
      );
    }

    if (field.type === "numeric")
    {
      return (
        <InputNumeric
          key={field.id}
          {...field}
        />
      );
    }

    if (field.type === "imageUpload")
    {
      return (
        <InputImage
          key={field.id}
          {...field}
        />
      );
    }

    if (field.type === "radio")
    {
      return (
        <InputRadio
          key={field.id}
          {...field}
        />
      );
    }

    if (field.type === "select")
    {
      return (
        <InputSelect
          key={field.id}
          {...field}
        />
      );
    }
  });

  return (
    <>
      <form
        className='d-flex flex-column gap-7'
        onSubmit={handleSubmit}>
        {formFieldsDOM}
      </form>
    </>
  );

  async function handleSubmit(event)
  {
    event.preventDefault();
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
    this.suffix = React.useCallback(() => suffix, []);
    this.type = type;
    this.validation = React.useCallback(() => validation, []);
    this.value = React.useCallback(() => value, []);

    for (let otherProperties in other)
    {
      if(typeof other[otherProperties] !== 'function') this[otherProperties] = other[otherProperties];
      else this[otherProperties] = React.useCallback(() => other[otherProperties], [])
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
