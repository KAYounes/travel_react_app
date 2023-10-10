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
          "form-label d-flex justify-content-between align-items-center",
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

  let textInputDOM;
  if (largeText) {
    textInputDOM = (
      <textarea
        id={id}
        name={name}
        type="text"
        className={clsx("form-control", isValid ? null : "is-invalid")}
        value={controlValue}
        ref={inputRef}
        onChange={handleChange}
        rows={5}
        style={{resize: "none"}}
        disabled
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
        ref={inputRef}
        onChange={handleChange}
        disabled
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
  ////
  React.useEffect(function () {
    inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
  });

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

  function handleChange() {
    setControlValue(inputRef.current.value);
  }

  function handleBlur() {}

  function handleFocus() {}
}
