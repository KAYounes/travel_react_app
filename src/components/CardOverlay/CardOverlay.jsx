import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
//
import styles from "./styles.module.css";

export default function CardOverlay({ children, handleEdit, handleDelete }) {
  return (
    <div className={clsx(styles.cardWrp, "")}>
      <div style={{pointerEvents: 'none'}}>
        {children}
        </div>
      <div className={clsx(styles.cardOverlay, "")}>
        <div className={clsx(styles.optionWrap, "")}>
          <div className={clsx(styles.option, "")} onClick={handleEdit}>
            <span>edit</span>
            <i
              className={clsx(styles["option-icon"], "bi bi-pencil-square")}
            ></i>
          </div>
        </div>
        <div className={clsx(styles.optionWrap, "")}>
          <div className={clsx(styles.option, "")} onClick={handleDelete}>
            {/* <div className={clsx(styles.option, "")}> */}
            <span>delete</span>
            <i
              className={clsx(styles["option-icon"], "bi bi-trash2-fill")}
            ></i>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
