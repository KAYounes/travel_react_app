import React from "react";
import clsx from "clsx";
import { IKUpload } from "imagekitio-react";
//
import styles from "./styles.module.css";
import StarRating from "../ui_components/StarRating/StarRating";
import { COUNTRIES } from "../../constants";
import {
    MAX_DURATION,
    MIN_DURATION,
    MAX_IMG_SIZE_MB,
    MAX_RATING,
    MIN_RATING,
    REGEX_IMG_TYPE,
    MIN_POPULARITY,
    MAX_POPULARITY,
    MIN_PRICE,
    MAX_PRICE,
} from "./constants";
import { numberFormatter, removeCommas } from "../../utils";
//

export default function CardEditorForm({ updateCardDate }) {
    function ImagePositionInput() {
        return (
            <div className="mb-3">
                <label className="form-label">Thumbnail Positioning</label>
                <div className="row row-cols-3 border border-1 g-0 rounded-3 bg-light p-3">
                    <div className="col-4">
                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posTopLeft"
                                checked={formData.poi === "top left"}
                                onChange={(e) => updateFormDate('poi', 'top left')}
                            />
                            <label htmlFor="posTopLeft" className="btn btn-outline-dark">
                                Top Left
                            </label>
                        </div>

                        <div className="my-3">
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posLeft"
                                checked={formData.poi === "left"}
                                onChange={(e) => updateFormDate('poi', 'left')}
                            />
                            <label htmlFor="posLeft" className="btn btn-outline-dark">
                                Left
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posBottomLeft"
                                checked={formData.poi === "bottom left"}
                                onChange={(e) => updateFormDate('poi', 'bottom left')}
                            />
                            <label htmlFor="posBottomLeft" className="btn btn-outline-dark">
                                Bottom Left
                            </label>
                        </div>
                    </div>

                    <div className="col-4 text-center">
                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posTop"
                                checked={formData.poi === "top"}
                                onChange={(e) => updateFormDate('poi', 'top')}
                            />
                            <label htmlFor="posTop" className="btn btn-outline-dark">
                                Top
                            </label>
                        </div>

                        <div className="my-3">
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posCenter"
                                checked={formData.poi === "center"}
                                onChange={(e) => updateFormDate('poi', 'center')}
                            />
                            <label htmlFor="posCenter" className="btn btn-outline-dark">
                                Center
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posBottom"
                                checked={formData.poi === "bottom"}
                                onChange={(e) => updateFormDate('poi', 'bottom')}
                            />
                            <label htmlFor="posBottom" className="btn btn-outline-dark">
                                Bottom
                            </label>
                        </div>
                    </div>

                    <div className="col-4 text-end">
                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posTopRight"
                                checked={formData.poi === "top right"}
                                onChange={(e) => updateFormDate('poi', 'top right')}
                            />
                            <label htmlFor="posTopRight" className="btn btn-outline-dark">
                                Top Right
                            </label>
                        </div>

                        <div className="my-3">
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posRight"
                                checked={formData.poi === "right"}
                                onChange={(e) => updateFormDate('poi', 'right')}
                            />
                            <label htmlFor="posRight" className="btn btn-outline-dark">
                                Right
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="thumbnailPosition"
                                id="posBottomRight"
                                checked={formData.poi === "bottom right"}
                                onChange={(e) => updateFormDate('poi', 'bottom right')}
                            />
                            <label htmlFor="posBottomRight" className="btn btn-outline-dark">
                                Bottom Right
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );

        function handleChangeThumbnailPosition(event) {
            const value = event.target.value;
            updateFormDate("poi", value);
        }
    }

    const stubIKUpload = React.useRef();
    const [uploadProgress, setUploadProgress] = React.useState(0);

    const countriesDOM = [];

    for (let country in COUNTRIES) {
        // console.log(country)
        countriesDOM.push(
            <option key={country} value={country}>
                {COUNTRIES[country]}
            </option>
        );
    }

    const [formData, setFormData] = React.useState({
        ThumbnailSrc: "",
        countryFlagSrc: "",
        duration: "",
        popularity: "",
        city: "",
        rating: "",
        country: "",
        priceOriginal: "",
        priceOffered: "",
        details: "",
        poi: "center",
        thumbnailID: "",
        id: "",
    });

    const [formErrors, setFormErrors] = React.useState({
        ThumbnailSrc: false,
        countryFlagSrc: false,
        duration: false,
        popularity: false,
        city: false,
        rating: false,
        country: false,
        priceOriginal: false,
        priceOffered: false,
        details: false,
        poi: false,
        thumbnailID: false,
        id: false,
    });

    React.useEffect(function () {
        if (!checkFormErrors()) updateCardDate(formData);
    });

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
                <div id="ikupload">
                    <IKUpload
                        // onSuccess={onSuccess}
                        // onError={onFail}
                        style={{ display: "none" }}
                        useUniqueFileName={false}
                        overwriteFile={true}
                    // onUploadProgress={onUploadProgress}
                    />
                </div>
                <label htmlFor="imagePath" className="form-label">
                    Thumbnail Image
                </label>
                <input
                    type="file"
                    name="imagePath"
                    id="imagePath"
                    className={clsx(
                        styles.inputNumber__noArrows,
                        formErrors.thumbnailSrc && "is-invalid",
                        "form-control"
                    )}
                    accept="image/*"
                    ref={stubIKUpload}
                    onChange={handleImageChange}
                />
                <div className="invalid-feedback">
                    Please choose an image file, the image should not be larger than{" "}
                    {MAX_IMG_SIZE_MB}MB.
                </div>
            </div>

            {/* <ImagePositionInput /> */}

            <div className="col-4 text-center">
                <div>
                    <input
                        type="radio"
                        className="btn-check"
                        name="thumbnailPosition"
                        id="posTop"
                        checked={formData.poi === "bottom"}
                        onChange={(e) => updateFormDate('poi', 'bottom')}
                    />
                    <label htmlFor="posTop" className="btn btn-light">
                        <i className="bi bi-align-top"></i>
                    </label>
                    <label htmlFor="posTop" className="form-check-label">
                        Top
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        className="btn-check"
                        name="thumbnailPosition"
                        id="posCenter"
                        checked={formData.poi === "bottom"}
                        onChange={(e) => updateFormDate('poi', 'bottom')}
                    />
                    <label htmlFor="posCenter" className="btn btn-light">
                        <i className="bi bi-align-center"></i>
                    </label>
                    <label htmlFor="posCenter" className="form-check-label">
                        Center
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        className="btn-check"
                        name="thumbnailPosition"
                        id="posBottom"
                        checked={formData.poi === "bottom"}
                        onChange={(e) => updateFormDate('poi', 'bottom')}
                    />
                    <label htmlFor="posBottom" className="btn btn-light">
                        <i className="bi bi-align-bottom"></i>
                    </label>
                    <label htmlFor="posBottom" className="form-check-label">
                        Bottom
                    </label>
                </div>
            </div>

            {/* <div>
      <input type="radio" className="btn-check" name="options" id="option1" />
<label className="btn btn-dark" htmlFor="option1">Checked</label>

<input type="radio" className="btn-check" name="options" id="option2" />
<label className="btn btn-dark" htmlFor="option2">Radio</label>

<div>
    <div>
        <input type="radio" className="btn-check" name="options" id="option3" />
        <label className="btn btn-dark" htmlFor="option3">Disabled</label>
    </div>
</div>

<div>
    <div>
        <input type="radio" className="btn-check" name="options" id="option4" />
        <label className="btn btn-dark" htmlFor="option4">Radio</label>
    </div>
</div>
      </div> */}

            <div className="mb-3">
                <label htmlFor="countrySelect" className="form-label">
                    Choose Country
                </label>
                <select
                    className="form-select"
                    id="countrySelect"
                    required
                    style={{ color: formData.country ? "black" : "#a6a6a6" }}
                    value={formData.country}
                    onChange={handleChangeCountry}
                >
                    <option value="" hidden>
                        Country
                    </option>
                    {countriesDOM}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="cityInput" className="form-label">
                    City
                </label>
                <input
                    id="cityInput"
                    type="text"
                    className={clsx(
                        styles.inputNumber__noArrows,
                        formErrors.city && "is-invalid",
                        "form-control"
                    )}
                    value={formData.city}
                    onChange={handleChangeCity}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="durationInput" className="form-label">
                    Duration
                </label>
                <div className="input-group has-validation">
                    <input
                        id="durationInput"
                        type="text"
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.duration && "is-invalid",
                            "form-control"
                        )}
                        value={formData.duration}
                        onChange={handleChangeDuration}
                    />
                    <span className="input-group-text">days</span>
                    <div className="invalid-feedback">
                        Please enter a number between {MIN_DURATION} and {MAX_DURATION}.
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="popularityInput" className="form-label">
                    Popularity
                </label>
                <div className="input-group has-validation">
                    <input
                        id="popularityInput"
                        type="text"
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.popularity && "is-invalid",
                            "form-control"
                        )}
                        value={formData.popularity}
                        onChange={handleChangePopularity}
                    />
                    <span className="input-group-text">people going</span>
                    <div className="invalid-feedback">
                        Please enter an integer between {MIN_POPULARITY} and{" "}
                        {numberFormatter(MAX_POPULARITY).addCommas().value()}.
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    Tour Rating
                </label>
                <div className="input-group has-validation">
                    <input
                        type="text"
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.rating && "is-invalid",
                            "form-control"
                        )}
                        value={formData.rating}
                        onChange={handleChangeRating}
                    />
                    <span className="input-group-text">
                        <StarRating rating={formData.rating} />
                    </span>
                    <div className="invalid-feedback">
                        Please enter a number between {MIN_RATING} and {MAX_RATING}, with{" "}
                        half increments.
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    Price Original
                </label>
                <div className="input-group has-validation">
                    <input
                        type="text"
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.priceOffered && "is-invalid",
                            "form-control"
                        )}
                        value={formData.priceOffered}
                        onChange={handleChangePriceOriginal}
                    />
                    <span className="input-group-text">$</span>

                    <div className="invalid-feedback">
                        Please enter a number between {MIN_PRICE} and{" "}
                        {numberFormatter(MAX_PRICE).addCommas().value()}.
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    Price Offered
                </label>
                <div className="input-group has-validation">
                    <input
                        type="text"
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.priceOriginal && "is-invalid",
                            "form-control"
                        )}
                        value={formData.priceOriginal}
                        onChange={handleChangePriceOffered}
                    />
                    <span className="input-group-text">$</span>

                    {formData.priceOffered && !formErrors.priceOffered ? (
                        <div className="invalid-feedback">
                            Please enter a number between {MIN_PRICE} and{" "}
                            {numberFormatter(formData.priceOffered).addCommas().value()}
                        </div>
                    ) : (
                        <div className="invalid-feedback">
                            Please enter a valid original price first.
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    Details
                </label>
                <textarea
                    className={clsx(
                        styles.inputNumber__noArrows,
                        formErrors.rating && "is-invalid",
                        "form-control"
                    )}
                    id="detailsInput"
                    rows="5"
                    style={{ resize: "none", rows: 50 }}
                    value={formData.details}
                    onChange={handleChangedetails}
                ></textarea>
            </div>

            <button className="form-control position-relative">
                Upload
                <div
                    className="progress position-absolute bottom-0 start-0 end-0"
                    style={{ height: 3 }}
                >
                    <div
                        className="progress-bar progress-bar-animated "
                        style={{
                            width: `${uploadProgress * 100 - (formData.ThumbnailSrc ? 0 : 10)
                                }%`,
                            backgroundColor: "#bce784",
                        }}
                    ></div>
                </div>
            </button>
        </form>
    );
    ////

    function handleChangeCountry(event) {
        const value = event.target.value;
        updateFormDate("country", value);
    }

    function handleChangeCity(event) {
        const value = event.target.value;
        updateFormDate("city", value);
    }

    function handleChangeDuration(event) {
        const value = event.target.value;
        const isValid = isWithinRange(value, MIN_DURATION, MAX_DURATION);

        updateFormDate("duration", value);
        updateFormErrors("duration", !isValid);
    }

    function handleChangePopularity(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");

        let isValid = isWithinRange(value, MIN_POPULARITY, MAX_POPULARITY);

        value = numberFormatter(value).addCommas().value();

        updateFormDate("popularity", value);
        updateFormErrors("popularity", !isValid);
    }

    function handleChangeRating(event) {
        const value = event.target.value;
        let isValid = isWithinRange(
            value,
            MIN_RATING,
            MAX_RATING,
            true,
            false,
            true
        );

        updateFormDate("rating", value);
        setFormErrors((prev) => ({ ...prev, rating: !isValid }));
    }

    function handleChangePriceOriginal(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");
        const isValid = isWithinRange(value, MIN_PRICE, MAX_PRICE);

        updateFormDate("priceOffered", numberFormatter(value).addCommas().value());
        updateFormErrors("priceOffered", !isValid);
    }

    function handleChangePriceOffered(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");
        const isValid = isWithinRange(
            value,
            MIN_PRICE,
            removeCommas(formData.priceOffered)
        );
        console.log(value, isValid, removeCommas(formData.priceOffered));
        updateFormDate("priceOriginal", numberFormatter(value).addCommas().value());
        updateFormErrors("priceOriginal", !isValid);
    }

    function handleChangedetails(event) {
        let value = event.target.value;
        updateFormDate("details", value);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        const isValid = validateImageFile(file);
        console.log(isValid);
        updateFormErrors("thumbnailSrc", !isValid);

        if (!isValid) return;

        const fileReader = new FileReader();

        fileReader.onload = function (event) {
            const img = event.target.result;
            updateFormDate("thumbnailSrc", img);
        };

        fileReader.readAsDataURL(file);
    }

    function validateImageFile(file) {
        if (!file) return false;
        if (!REGEX_IMG_TYPE.test(file.type)) return false;
        if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;

        return true;
    }

    function updateFormDate(key, value) {
        setFormData(function (prev) {
            return {
                ...prev,
                [key]: value,
            };
        });
    }

    function updateFormErrors(key, value) {
        setFormErrors(function (prev) {
            return {
                ...prev,
                [key]: value,
            };
        });
    }

    function checkFormErrors() {
        for (let key in formErrors) {
            if (formErrors[key]) return true;
        }

        return false;
    }

    function isWithinRange(
        value,
        min,
        max,
        acceptEmpty = true,
        allowFraction = false,
        allowHalves = false
    ) {
        const debug = true;
        value = value.toString();
        min = +min;
        max = +max;

        // terminate if min or max are not numbers
        if (isNaN(min) || isNaN(max)) return false;

        debug && console.log(1);
        // terminate if the value is empty
        if (!value) return acceptEmpty;

        debug && console.log(2);
        // terminate if the value is not a number
        if (Number.isNaN(Number(value))) return false;

        debug && console.log(3);
        // terminate if number is outside range
        if (value < min) return false;

        debug && console.log(4);
        //terminate if number is outside range
        if (value > max) return false;

        let fractionPart = Number(value.split(".")[1]);

        debug && console.log(5);
        //terminate if fractions are not allow but halves are, and the fraction part is neither none nor 0.5
        if (allowHalves && !allowFraction)
            return fractionPart ? fractionPart === 5 : true;

        debug && console.log(6);
        //terminate if fractions are not allowed and there is a fraction part
        if (!allowFraction) return fractionPart ? fractionPart === 0 : true;

        return true;
    }
}
