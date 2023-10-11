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
import { isWithinRange } from "../helpers";
//

export default function InputText({
  label,
  prefix,
  suffix,
  id,
  name,
  hint,
  invalidFeedback,
  validFeedback,
  required  = false,
  isValid   = true,
  largeText = false,
  disabled  = false,
  control,
}) {
  ////
  const hasValidation = invalidFeedback || validFeedback;
  const [controlValue, setControlValue] = control;
  //   console.log({controlValue, isValid})
  //

  let labelDOM;
  if (label) {
    labelDOM = (
      <label
        htmlFor={id}
        className={clsx(
          "form-label d-flex justify-content-between align-items-center  text-capitalize",
          label || "visually-hidden"
        )}
      >
        {label.split(/(?=[A-Z])/).join(' ')}
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

  let prefixDOM;
  if (prefix) {
    prefixDOM = <span className="input-group-text">{prefix}</span>;
  }

  let textInputDOM;
  if (largeText) {
    textInputDOM = (
      <textarea
        id={id}
        name={name}
        type="text"
        className={clsx("form-control", isValid ? null : "is-invalid")}
        value={controlValue}
        onChange={handleChange}
        rows={5}
        style={{resize: "none"}}
        disabled={disabled}
      ></textarea>
    );
  } else {
    textInputDOM = (
      <input
        id={id}
        name={name}
        type="text"
        className={clsx("form-control", isValid ? null : "is-invalid")}
        value={controlValue}
        onChange={handleChange}
        disabled={disabled}
      />
    );
  }

  let suffixDOM;
  if (suffix) {
    suffixDOM = <span className="input-group-text">{suffix}</span>;
  }

  let invalidFeedbackDOM;
  if (invalidFeedback) {
    invalidFeedbackDOM = (
      <div className="invalid-feedback">{invalidFeedback}</div>
    );
  }

  let validFeedbackDOM;
  if (validFeedback) {
    validFeedbackDOM = <div className="valid-feedback">{validFeedback}</div>;
  }

  let hintDOM;
  if (hint) {
    hintDOM = <div className="form-text">{hint}</div>;
  }

  return (
    <div className={clsx()}>
      {labelDOM}
      <div className={clsx("input-group", hasValidation && "has-validation")}>
        {prefixDOM}
        {textInputDOM}
        {suffixDOM}
        {invalidFeedbackDOM}
        {validFeedbackDOM}
      </div>
      {hintDOM}
    </div>
  );

  function handleChange(event) {
    setControlValue(event.target.value);
  }

  function handleBlur() {}

  function handleFocus() {}
}
