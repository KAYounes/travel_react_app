import React from "react";
import styles from "./styles.module.css";
import Button from "../ui_components/buttons/Button";
import { FLAGS_API, FLAGS_API_SUFFIX } from "../../constants";
import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";
//
import clsx from "clsx";
import { addPadding, addSeparator, asCurrency } from "../../utils";
import StarRating from "../ui_components/StarRating/StarRating";
//
export default function TourCard({ cardData }) {
  const {
    thumbnailSrc,
    poi,
    countryKey,
    country,
    city,
    duration,
    popularity,
    rating,
    priceOriginal,
    priceOffered,
    details,
    thumbnailID,
    id,
  } = cardData;

  // console.log('1', cardData)

  let thumbnailDOM;
  if (thumbnailID) {
    thumbnailDOM = (
      <IKImage
        path={thumbnailSrc ? thumbnailSrc : country + ".jpg"}
        lqip={{ active: true, quality: 1, blur: 5 }}
        transformation={[{quality: 50}]}
      />
    );
  } else if (thumbnailSrc) {
    thumbnailDOM = <img src={thumbnailSrc} style={{ objectPosition: poi }} />;
  } else {
    thumbnailDOM = (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <i className="bi-thin bi-card-image fs-1"></i>
      </div>
    );
  }

  let countryDOM;
  if (country) {
    countryDOM = (
      <>
        <img src="/assets/icons/location.svg" alt="" className={styles.icon} />
        {country}
      </>
    );
  } else {
    countryDOM = (
      <div className="placeholder-glow col-3">
        <div className="placeholder placeholder w-100"></div>
      </div>
    );
  }

  let popularityDOM;
  if (popularity) {
    popularityDOM = (
      <span className="d-flex align-items-center gap-2">
        <img src="/assets/icons/avatar.svg" alt="" className={styles.icon} />{" "}
        {addSeparator(popularity)} Going
      </span>
    );
  } else {
    popularityDOM = (
      <div className="placeholder-glow col-3">
        <div className="placeholder placeholder w-100"></div>
      </div>
    );
  }

  let durationDOM;
  if (duration) {
    durationDOM = (
      <span className="d-flex align-items-center gap-2">
        <img src="/assets/icons/calender.svg" alt="" className={styles.icon} />{" "}
        {addPadding(duration)} Days
      </span>
    );
  } else {
    durationDOM = (
      <div className="placeholder-glow col-3">
        <div className="placeholder placeholder w-100"></div>
      </div>
    );
  }

  let cityDOM;
  if (city) {
    cityDOM = (
      <h5 className={clsx(styles.card__title, 'text-truncate')}>
        <Link
          to={id ? "./edit/" + id : ""}
          className="stretched/link text-black text-capitalize"
        >
          {city}
        </Link>
      </h5>
    );
  } else {
    cityDOM = (
      <div className="placeholder-glow col-6">
        <div className="placeholder placeholder-lg w-100"></div>
      </div>
    );
  }

  let ratingDOM;
  if (rating) {
    ratingDOM = <StarRating rating={rating} />;
  } else {
    ratingDOM = (
      <div className="placeholder-glow" style={{ width: 70 }}>
        <div className="placeholder placeholder-lg bg-warning w-100"></div>
      </div>
    );
  }

  let pricingDOM;
  if (priceOriginal) {
    pricingDOM = (
      <>
        <span className="text-primary lead fw-medium">
          {asCurrency(priceOffered)}
        </span>
        <small className={clsx(styles.price_old)}>
          {asCurrency(priceOriginal)}
        </small>
      </>
    );
  } else {
    pricingDOM = (
      <>
        <div className="placeholder-glow col-3">
          <div className="placeholder placeholder bg-primary w-100"></div>
        </div>
        <div className="placeholder-glow col-3">
          <div className="placeholder placeholder w-100"></div>
        </div>
      </>
    );
  }

  let detailsDOM;
  if (details) {
    detailsDOM = (
      <small className="card-text mb-auto text-wrap">{details}</small>
    );
  } else {
    detailsDOM = (
      <div className="placeholder-glow col-12">
        <div className="placeholder placeholder-lg w-100"></div>
        <div className="placeholder placeholder-lg w-100"></div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.card, "card border-0 h-100 gap-8")}>
      <div className="position-relative">
        <div className={clsx(styles.card__imgWrap)}>{thumbnailDOM}</div>
        <div className={clsx(styles.card__flagWrp)}>
          {country && <img src={FLAGS_API + countryKey + FLAGS_API_SUFFIX} />}
        </div>

        <div
          className={clsx(
            styles.card__rating,
            "d-md-none d-flex flex-row gap-1 justify-content-end w-100 mt-1"
          )}
        >
          {ratingDOM}
        </div>
      </div>
      <div
        className={clsx(
          styles.card__body,
          "card-body d-flex flex-column gap-1"
        )}
      >
        <small className="text-muted d-flex justify-content-between flex-row">
          {durationDOM}
          {popularityDOM}
        </small>
        <div className="d-flex flex-row justify-content-between">
          {cityDOM}
          <div
            className={clsx(
              styles.card__rating,
              "d-md-flex d-none flex-row justify-content-end gap-1"
            )}
          >
            {ratingDOM}
          </div>
        </div>
        <div>
          <small className="d-flex align-items-center gap-2 text-muted text-capitalize">
            {countryDOM}
          </small>
        </div>
        <div className="d-flex align-items-center gap-3 fw-medium my-3">
          {pricingDOM}
        </div>
        {detailsDOM}

        <Button mods={"mt-5"}>Explore Now</Button>
      </div>
    </div>
  );
}
