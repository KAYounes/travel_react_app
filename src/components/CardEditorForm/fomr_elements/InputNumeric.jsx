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

export default function InputNumeric({
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
  React.useEffect(function () {
    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  });

  return (
    <div className={clsx()}>
      {labelDOM}
      <div className={clsx("input-group", hasValidation && "has-validation")}>
        {prefixDOM}
        <input
          id={id}
          name={name}
          type="text"
          className={clsx("form-control", isValid ? null : "is-invalid")}
          value={controlValue}
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
        />
        {suffixDOM}
        {invalidFeedbackDOM}
        {validFeedbackDOM}
      </div>
      {hintDOM}
    </div>
  );

  function handleChange() {
    acceptOnlyNumericValues();
  }

  function acceptOnlyNumericValues() {
    let value = inputRef.current.value;
    let numericValue = extractNumber(value);
    let offset = Math.max(value.length - numericValue.length, 0);
    let actualCursor = inputRef.current.selectionStart;

    setControlValue(numericValue);
    setCursorPosition(actualCursor - offset);
  }

  function handleBlur() {
    if (asDecimal) {
      inputRef.current.value = addSeparator(controlValue);
    }
  }

  function handleFocus() {
    if (asDecimal) {
      inputRef.current.value = controlValue;
    }
  }
}
