import React from "react";
import clsx from "clsx";
import { IKUpload } from "imagekitio-react";
import { LoremIpsum } from "lorem-ipsum";
//
import styles from "./styles.module.css";
import StarRating from "../ui_components/StarRating/StarRating";
import { COUNTRIES, MOCKAPI_ENDPOINT } from "../../constants";
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
    MAX_DETAILS_LENGTH,
    MIN_DETAILS_LENGTH,
} from "./constants";
import { numberFormatter, removeCommas } from "../../utils";
import { requestFromServer, updateTour, uploadTour } from "./helpers";
//

export default function CardEditorForm({ updateCardDate }) {
    // console.log(window.location)
    const stubIKUpload = React.useRef();
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [isImageUploaded, setIsImageUploaded] = React.useState(false);
    const [isCardUploaded, setIsCardUploaded] = React.useState(false);

    const cardID = window.location.pathname.match(/(?<=edit\/)\d*/)



    const countriesOptions = [];

    for (let country in COUNTRIES) {
        countriesOptions.push(
            <option key={country} value={country}>
                {COUNTRIES[country]}
            </option>
        );
    }

    const [formData, setFormData] = React.useState({
        thumbnailSrc: "",
        countryKey: "",
        duration: "",
        popularity: "",
        city: "",
        rating: "",
        country: "",
        priceOriginal: "",
        priceOffered: "",
        details: new LoremIpsum().generateWords(18),
        poi: "center",
        thumbnailID: "",
        // id: "",
    });

    const [formErrors, setFormErrors] = React.useState({
        thumbnailSrc: false,
        countryKey: false,
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
        // id: false,
    });

    React.useEffect(function(){
        if (!cardID) return

        async function get() {
            let response = await fetch(MOCKAPI_ENDPOINT + '/' + cardID).then((r) => r.json());
            console.log('res' , response)
            setFormData(response)
        }
        
        get();
    }, [])

    React.useEffect(
        function () {
            for (let key in formErrors) {
                if (!formErrors[key]) updateCardDate(key, formData[key]);
            }
        },
        [formData]
    );

    React.useEffect(
        function () {
            if (!isImageUploaded) return;

            // async function get() {
            //     let response = await fetch(MOCKAPI_ENDPOINT, {
            //         method: "post",
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(formData),
            //     }).then((r) => r.json());

            // }
            // get();

            if(cardID){
                updateTour(cardID, formData)
            }else{
                uploadTour(formData)
            }
        },
        [isImageUploaded]
    );

    function onSuccess(response) {
        setIsImageUploaded(true)
        updateFormData("thumbnailSrc", response.filePath);
        updateFormData("thumbnailID", response.fileId);
    }

    function onFail(args) {
        console.log("fail", args);
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
                <div id="ikupload">
                    <IKUpload
                        onSuccess={onSuccess}
                        onError={onFail}
                        style={{ display: "none" }}
                        useUniqueFileName={false}
                        overwriteFile={true}
                        onUploadProgress={onUploadProgress}
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
                    disabled={!!uploadProgress}
                />
                <div className="invalid-feedback">
                    Please choose an image file, the image should not be larger than{" "}
                    {MAX_IMG_SIZE_MB}MB.
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    Thumbnail Alignment
                </label>
                <div className="row">
                    <div className="col-4">
                        <input
                            type="radio"
                            className="btn-check"
                            name="thumbnailPosition"
                            id="posTop"
                            checked={formData.poi === "top"}
                            onChange={(e) => updateFormData("poi", "top")}
                            disabled={!!uploadProgress}
                        />
                        <label htmlFor="posTop" className="btn btn-light">
                            <i className="bi bi-align-top"></i>
                        </label>
                        <label htmlFor="posTop" className="form-check-label ms-3">
                            Top
                        </label>
                    </div>
                    <div className="col-4">
                        <input
                            type="radio"
                            className="btn-check"
                            name="thumbnailPosition"
                            id="posCenter"
                            checked={formData.poi === "center"}
                            onChange={(e) => updateFormData("poi", "center")}
                            disabled={!!uploadProgress}
                        />
                        <label htmlFor="posCenter" className="btn btn-light">
                            <i className="bi bi-align-center"></i>
                        </label>
                        <label htmlFor="posCenter" className="form-check-label ms-3">
                            Center
                        </label>
                    </div>
                    <div className="col-4">
                        <input
                            type="radio"
                            className="btn-check"
                            name="thumbnailPosition"
                            id="posBottom"
                            checked={formData.poi === "bottom"}
                            onChange={(e) => updateFormData("poi", "bottom")}
                            disabled={!!uploadProgress}
                        />
                        <label htmlFor="posBottom" className="btn btn-light">
                            <i className="bi bi-align-bottom"></i>
                        </label>
                        <label htmlFor="posBottom" className="form-check-label ms-3">
                            Bottom
                        </label>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="countrySelect" className="form-label">
                    Choose Country
                </label>
                <select
                    className={clsx("form-select", formErrors.country && "is-invalid")}
                    id="countrySelect"
                    style={{ color: formData.country ? "black" : "#a6a6a6" }}
                    value={formData.countryKey}
                    onChange={handleChangeCountry}
                    disabled={!!uploadProgress}
                >
                    <option value="" hidden>
                        Country
                    </option>
                    {countriesOptions}
                </select>

                <div className="invalid-feedback">
                    Please choose a country from the list
                </div>
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
                    disabled={!!uploadProgress}
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
                        disabled={!!uploadProgress}
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
                        disabled={!!uploadProgress}
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
                        disabled={!!uploadProgress}
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
                            formErrors.priceOriginal && "is-invalid",
                            "form-control"
                        )}
                        value={formData.priceOriginal}
                        onChange={handleChangePriceOriginal}
                        disabled={!!uploadProgress}
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
                            formErrors.priceOffered && "is-invalid",
                            "form-control"
                        )}
                        value={formData.priceOffered}
                        onChange={handleChangePriceOffered}
                        disabled={!!uploadProgress}
                    />
                    <span className="input-group-text">$</span>

                    {formErrors.priceOriginal ? (
                        <div className="invalid-feedback">
                            Please enter a valid original price first.
                        </div>
                    ) : (
                        <div className="invalid-feedback">
                            Please enter a number between {MIN_PRICE} and less than{" "}
                            {formData.priceOriginal}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-3 position-relative">
                <div className="position-relative">
                    <label htmlFor="" className="form-label">
                        Details
                    </label>
                    <textarea
                        className={clsx(
                            styles.inputNumber__noArrows,
                            formErrors.details && "is-invalid",
                            "form-control"
                        )}
                        id="detailsInput"
                        rows="5"
                        style={{ resize: "none", rows: 50 }}
                        value={formData.details}
                        onChange={handleChangeDetails}
                        disabled={!!uploadProgress}
                    ></textarea>
                    <small
                        className={clsx(
                            formErrors.details ? "text-danger" : "text-muted",
                            "position-absolute end-0 bottom-0 p-2"
                        )}
                    >
                        {formData.details.length} / {MAX_DETAILS_LENGTH}
                    </small>
                </div>
                {formErrors.details && (
                    <small className="text-danger">
                        Please have between {MIN_DETAILS_LENGTH} and {MAX_DETAILS_LENGTH}{" "}
                        characters.
                    </small>
                )}
            </div>

            <button className="form-control position-relative" type="submit">
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
        updateFormData("countryKey", value);
        updateFormData("country", COUNTRIES[value]);
    }

    function handleChangeCity(event) {
        const value = event.target.value;
        updateFormData("city", value);
    }

    function handleChangeDuration(event) {
        const value = event.target.value;
        const isValid = isWithinRange(value, MIN_DURATION, MAX_DURATION);

        updateFormData("duration", value);
        updateFormErrors("duration", !isValid);
    }

    function handleChangePopularity(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");

        let isValid = isWithinRange(value, MIN_POPULARITY, MAX_POPULARITY);

        value = numberFormatter(value).addCommas().value();

        updateFormData("popularity", value);
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

        updateFormData("rating", value);
        setFormErrors((prev) => ({ ...prev, rating: !isValid }));
    }

    function handleChangePriceOriginal(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");
        const isValid = isWithinRange(value, MIN_PRICE, MAX_PRICE);

        updateFormData("priceOriginal", numberFormatter(value).addCommas().value());
        updateFormErrors("priceOriginal", !isValid);
    }

    function handleChangePriceOffered(event) {
        let value = event.target.value;
        value = value.replaceAll(/,/g, "");

        let maxOfferedPrice = Number(removeCommas(formData.priceOriginal)) - 1;
        const isValid = isWithinRange(value, MIN_PRICE, maxOfferedPrice);
        updateFormData("priceOffered", numberFormatter(value).addCommas().value());
        updateFormErrors("priceOffered", !isValid);
    }

    function handleChangeDetails(event) {
        let value = event.target.value;
        // the ORing is done to avoid triggering errors when everything is deleted. It replaces length 0 with empty string
        let isValid = isWithinRange(
            value.length || "",
            MIN_DETAILS_LENGTH,
            MAX_DETAILS_LENGTH
        );
        updateFormData("details", value);
        updateFormErrors("details", !isValid);
    }

    function handleImageChange(event) {
        const file = event.target.files[0];
        const isValid = validateImageFile(file);
        updateFormErrors("thumbnailSrc", !isValid);

        if (!isValid) return;

        const fileReader = new FileReader();

        fileReader.onload = function (event) {
            const img = event.target.result;
            updateFormData("thumbnailSrc", img);
            updateFormData("thumbnailID", "");
        };

        fileReader.readAsDataURL(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let isValidForm = triggerErrorsForEmptyFields();
        console.table({isValidForm})
        if (!isValidForm) return

        if(!formData.thumbnailID) uploadImage();
        else setIsImageUploaded(true)
    }

    function triggerErrorsForEmptyFields() {
        let isValidForm = true
        for (let key in formData) {
            // console.log(formData[key], key)
            if(key === 'thumbnailID') continue
            if (!formData[key]) {
                console.log(key, formData[key])
                updateFormErrors(key, true);
                isValidForm = false
            }
        }
        return isValidForm
    }

    async function uploadImage() {
        const files = stubIKUpload.current.files;
        if (!files) return;

        const ikupload = document.querySelector("#ikupload > input");
        ikupload.files = files;
        ikupload.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function onUploadProgress(progress) {
        setUploadProgress(progress.loaded / progress.total);
    }

    function validateImageFile(file) {
        if (!file) return false;
        if (!REGEX_IMG_TYPE.test(file.type)) return false;
        if (file.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;

        return true;
    }

    function updateFormData(key, value) {
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
        const debug = false;
        value = value.toString();
        min = +min;
        max = +max;
        debug && console.log(value);

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
