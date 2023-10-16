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

export default function InputRadio({
  label,
  prefix,
  suffix,
  id,
  name = crypto.randomUUID(),
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

  const inputDOM = (
    <div className="row justify-content-between">
      <div className="col-auto">
        <input
          type="radio"
          name="thumbnailPosition"
          id={id + "Top"}
          value='top'
          className="btn-check"
          checked={controlValue === "top"}
          onChange={handleChange}
          disabled={disabled}
        />
        <label htmlFor={id + "Top"} className="btn btn-light">
          <i className="bi bi-align-top"></i>
        </label>
        <label htmlFor={id + "Top"} className="form-check-label ms-3">
          Top
        </label>
      </div>

      <div className="col-auto">
        <input
          type="radio"
          className="btn-check"
          name="thumbnailPosition"
          id={id + "Center"}
          checked={controlValue === "center"}
          onChange={handleChange}
          disabled={disabled}
          value='center'
        />
        <label htmlFor={id + "Center"} className="btn btn-light">
          <i className="bi bi-align-center"></i>
        </label>
        <label htmlFor={id + "Center"} className="form-check-label ms-3">
          Center
        </label>
      </div>

      <div className="col-auto">
        <input
          type="radio"
          className="btn-check"
          name="thumbnailPosition"
          id={id + "Bottom"}
          checked={controlValue === "bottom"}
          onChange={handleChange}
          disabled={disabled}
          value='bottom'
        />
        <label htmlFor={id + "Bottom"} className="btn btn-light">
          <i className="bi bi-align-bottom"></i>
        </label>
        <label htmlFor={id + "Bottom"} className="form-check-label ms-3">
          Bottom
        </label>
      </div>
    </div>
  );

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
        {prefixDOM}
        {inputDOM}
        {suffixDOM}
        {invalidFeedbackDOM}
        {validFeedbackDOM}
      {hintDOM}
    </div>
  );

  function handleChange(event) {
    setControlValue(event.target.value);
  }
}
///////////