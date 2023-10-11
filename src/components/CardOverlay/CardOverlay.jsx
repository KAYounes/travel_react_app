/* eslint-disable react/prop-types */
import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
//
import styles from "./styles.module.css";

export default function CardOverlay({
  children,
  handleEdit,
  handleDelete,
}) {
  const [showSpinner, setShowSpinner] = React.useState(false)

  return (
    <div className={clsx(styles.cardWrp, "")}>
      <div style={{ pointerEvents: "none" }}>{children}</div>
      <div className={clsx(styles.cardOverlay, "")}>
        <div className={clsx(styles.optionWrap, "")}>
          <div className={clsx(styles.option, "")} onClick={handleEdit}>
            <span>edit</span>
            <i
              className={clsx(styles["option-icon"], "bi-thin bi-pencil-square")}
            ></i>
          </div>
        </div>
        <div className={clsx(styles.optionWrap, "")}>
          <div className={clsx(styles.option, "")} onClick={() =>{setShowSpinner(true); handleDelete();}}>
            {/* <div className={clsx(styles.option, "")}> */}
            <span>delete</span>
            <i className={clsx(styles["option-icon"], "bi-thin bi-trash2-fill")}></i>
            {/* </div> */}
          </div>
        </div>
        {showSpinner && (
          <div className={clsx(styles.spinner)}>
            <div className="spinner-border">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
