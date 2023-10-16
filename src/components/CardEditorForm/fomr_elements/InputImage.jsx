/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";
//
import styles from "./styles.module.css";
//
import {
  addSeparator,
  extractNumber,
  removeSeparator,
  unformatNumber,
} from "../../../utils";
import { isWithinRange, updateTour } from "../helpers";
//

export default function InputImage({
  label,
  id,
  name,
  invalidFeedback,
  validFeedback,
  asDecimal = false,
  asCurrency = false,
  required = false,
  isValid = true,
  disabled,
  control,
}) {
  const [uploadType, setUploadType] = React.useState();
  const fileInputRef = React.useRef();
  //   let uploadType;
  ////
  const [controlValue, setControlValue] = control;
  //   console.log({controlValue, isValid})
  //

  let labelDOM;
  if (label) {
    labelDOM = (
      <label
        htmlFor={id}
        className={clsx(
          "form-label d-flex justify-content-between align-items-center text-capitalize fw-medium",
          label || "visually-hidden"
        )}
      >
        {label}
        {required ? (
          <small
            className={clsx(styles.requiredIndicator, "badge rounded-pill")}
          >
            required filed
          </small>
        ) : null}
      </label>
    );
  }

  const prefixDOM = (
    <span className="input-group-text">
      {
        <svg
          width="16"
          height="16"
          className="me-3"
          viewBox="0 0 32 32"
          version="1.1"
          aria-labelledby="unsplash-home"
          aria-hidden="false"
        >
          <desc lang="en-US">Unsplash logo</desc>
          <title id="unsplash-home">Unsplash Home</title>
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>
      }
      {"URL"}
    </span>
  );
  const suffixDOM = (
    <button
      className="btn btn-secondary border"
      onClick={() => clearFileInput()}
      type="button"
      disabled={disabled || uploadType === "URL"}
    >
      clear
    </button>
  );

  //   const hintDOM = <div className="form-text">{hint}</div>;

  let invalidFeedbackDOM;
  if (invalidFeedback) {
    invalidFeedbackDOM = (
      <div className="invalid-feedback">{invalidFeedback}</div>
    );
  }

  const hintDOM = (
    <div className="form-text">
      You can upload an image from your local files, or an image from{" "}
      <mark>
        <strong>unsplash.com</strong>
      </mark>
    </div>
  );

  return (
    <div className={clsx("")}>
      {labelDOM}
      {hintDOM}

      <div className={clsx("input-group my-3")}>
        {prefixDOM}
        {
          <input
            id={id}
            name={name}
            type="url"
            className={clsx(
              "form-control",
              !isValid && uploadType !== "file" ? "is-invalid" : null
            )}
            // value={controlValue}
            onChange={handleChangeURL}
            disabled={disabled || uploadType === "file"}
          />
        }
        {/* {invalidFeedbackDOM} */}
      </div>
      <div className={clsx("input-group")}>
        {
          <input
            id={id}
            name={name}
            type="file"
            accept="image/*"
            className={clsx(
              "form-control",
              !isValid && uploadType !== "URL" ? "is-invalid" : null
            )}
            // value={controlValue}
            ref={fileInputRef}
            onChange={handleChangeFile}
            disabled={disabled || uploadType === "URL"}
          />
        }
        {suffixDOM}
      </div>
      {/* {hintDOM} */}
      <div className={clsx("h-0", isValid ? null : "is-invalid")}></div>
      {invalidFeedbackDOM}
    </div>
  );

  function handleChange(event) {
    if (event.target.value) {
      if (event.target?.files) setUploadType("file");
      else setUploadType("URL");
    } else setUploadType(null);
  }

  function handleChangeURL(event) {
    const value = event.target.value;

    if (value) setUploadType("URL");
    else setUploadType(null);

    setControlValue(value);
  }

  function handleChangeFile(event) {
    const value = event.target.value;

    if (value) setUploadType("file");
    else setUploadType(null);

    const fileList = event.target.files;

    if (!fileList.length) return setControlValue("");
    setControlValue(fileList);

    // if (!fileList[0]) return setControlValue('')

    // const fileReader = new FileReader();

    // fileReader.onload = function (event) {
    //   const img = event.target.result;
    //   setControlValue(img);
    // };

    // fileReader.readAsDataURL(fileList[0]);
  }

  function clearFileInput() {
    if (!fileInputRef.current.value) return;
    fileInputRef.current.value = "";
    fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
