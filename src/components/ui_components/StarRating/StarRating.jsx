import React from "react";
import styles from './styles.module.css'

export default function StarRating({ rating }) {
  const stars = new Array(5);

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1)
      stars[i] = (
        <img
          className={styles.icon}
          src="/assets/icons/star_filled.svg"
          alt=""
          key={i}
        />
      );
    else if (rating > i)
      stars[i] = (
        <img
          className={styles.icon}
          src="/assets/icons/star_half.svg"
          alt=""
          key={i}
        />
      );
    else
      stars[i] = (
        <img
          className={styles.icon}
          src="/assets/icons/star_empty.svg"
          alt=""
          key={i}
        />
      );
  }

  return stars;
}
