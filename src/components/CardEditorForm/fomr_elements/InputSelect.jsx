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
import { COUNTRIES } from "../constants";
//

export default function InputSelect({
  label,
  prefix,
  suffix,
  id,
  name,
  hint,
  invalidFeedback,
  validFeedback,
  asDecimal = false,
  asCurrency = false,
  required = false,
  isValid = true,
  disabled,
  control,
}) {
  const [cursorPosition, setCursorPosition] = React.useState(0);
  const inputRef = React.useRef();
  ////
  const hasValidation = invalidFeedback || validFeedback;
  const [controlValue, setControlValue] = control;
  //   console.log({controlValue, isValid})
  const countriesOptions = [];

  for (let country in COUNTRIES) {
    countriesOptions.push(
      <option key={country} value={country}>
        {COUNTRIES[country]}
      </option>
    );
  }
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

  let prefixDOM;
  if (prefix) {
    prefixDOM = <span className="input-group-text">{prefix}</span>;
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
  ////
  return (
    <div className={clsx()}>
      {labelDOM}
      <div className={clsx("input-group", hasValidation && "has-validation")}>
        {prefixDOM}
        <select
          id="countrySelect"
          name={name}
          className={clsx("form-select", isValid ? null : "is-invalid")}
          style={{ color: controlValue ? "black" : "#a6a6a6" }}
          value={controlValue}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="" hidden>
            Country
          </option>
          {countriesOptions}
        </select>
        {suffixDOM}
        {invalidFeedbackDOM}
        {validFeedbackDOM}
      </div>
      {hintDOM}
    </div>
  );

  function handleChange(event) {
    setControlValue(event.target.value
        )
  }
}
