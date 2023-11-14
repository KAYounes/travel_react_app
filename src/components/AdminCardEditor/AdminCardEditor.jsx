import clsx from "clsx";
import { IKContext, IKUpload } from "imagekitio-react";
import React, { useCallback } from "react";
import AdminNavbar from "../AdminNavbar";
import CardEditorForm from "../CardEditorForm";
import TourCard from "../TourCard/TourCard";
import Col from "../ui_components/wrappers/Col";
import Row from "../ui_components/wrappers/Row";
import Section from "../ui_components/wrappers/Section";
import { LoremIpsum } from "lorem-ipsum";
import { useNavigate } from "react-router-dom";
import { colors } from "../../colors";
import { IKIO_ENDPOINT, IKIO_PUBKEY } from "../../constants";
import {
    IKUploadAuthenticator,
    SLFunctionRequest,
    getFromDatabase,
    postToDatabase,
    updateDatabase,
} from "../../fetch.helpers";
import { COUNTRIES } from "../CardEditorForm/constants";
import { checkInputIsFile, convertImageToString } from "./helpers";
import { POST, PUT } from "./constants";
import { consoleLog } from "../../logging";
//
//
//
export default function AdminCardEditor() {
    const navigator = useNavigate();

    //// refs
    //
    const refRanOnce = React.useRef(false);
    const formState = React.useRef({});
    const submitType = React.useRef(PUT);
    const imageForm = React.useRef();
    const loadingIntervalId = React.useRef();
    const cardID = React.useRef(window.location.pathname.match(/(?<=edit\/)\d+/)?.[0]); // initial value from URL

    //// states
    //
    const [editingMode, setEditingMode] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);

    // data sent to database
    const [cardData, setCardData] = React.useState({
        thumbnailURL: "",
        poi: "",
        countryKey: "",
        country: "",
        city: "",
        duration: "",
        popularity: "",
        rating: "",
        priceOriginal: "",
        priceOffered: "",
        details: "",
        thumbnailID: "",
        id: "",
    });

    // stores user input
    const [formData, setFormData] = React.useState({
        poi: "center",
        countryKey: "",
        country: "",
        city: "New City",
        duration: "18",
        popularity: "92132",
        rating: "0.5",
        priceOriginal: "2400",
        priceOffered: "1800",
        details: new LoremIpsum().generateWords(18),

        thumbnail: "",
    });

    // stores card fetched from database
    const [cardDataFetched, setCardDataFetched] = React.useState();

    //// local variables
    //
    const inProgress = uploadProgress > 0 && uploadProgress < 1;
    const progressBarLength = uploadProgress * 90 + (uploadProgress && 10) + "%";
    const progressBarColor =
        (uploadProgress < 0 && "#E88484") ||
        (uploadProgress === 0 && "#E8F7D4") ||
        (uploadProgress < 1 && "#bce784") ||
        (uploadProgress === 1 && "#E8F7D4");

    //// callback functions
    //

    // wrapper around setCardData
    const updateCardData = useCallback(function (key, value) {
        setCardData(function (prev) {
            return {
                ...prev,
                [key]: value,
            };
        });
    }, []);

    // wrapper around setFormData
    const updateFormData = useCallback(function (key, value) {
        setFormData(function (prev) {
            return {
                ...prev,
                [key]: value,
            };
        });
    }, []);
    //

    //// use effects
    //

    // map form data to card data
    React.useEffect(
        function () {
            resolveUpdates();
        },
        [formData],
    );

    //// logic
    //

    // fetch card from database using card id from
    if (cardID.current) {
        if (!refRanOnce.current) {
            getFromDatabase({ id: cardID.current }, function (data) {
                // editingMode.current = Boolean(cardID.current);
                setEditingMode(Boolean(cardID.current));
                const card = data[0];

                if (!card) return navigator("../admin");

                setCardDataFetched(card);

                for (let key in formData) {
                    if (key in card) {
                        updateFormData(key, card[key]);
                    }
                }
            });
            refRanOnce.current = true;
        }
    }

    //// Rendering
    return (
        <>
            <AdminNavbar
                goseTo='/admin'
                backButtonText='Dashboard'
                subTitle='Add Tour Package'
            />
            <Section>
                <IKContext
                    urlEndpoint={IKIO_ENDPOINT}
                    publicKey={IKIO_PUBKEY}
                    authenticator={IKUploadAuthenticator}>
                    <Row mods={clsx("gx-5")}>
                        <Col mods={"col-4"}>
                            <div
                                className='position-sticky top-5'
                                style={{ height: "min-content" }}>
                                <TourCard cardData={cardData} />
                            </div>
                        </Col>

                        <Col mods={"col-7"}>
                            <CardEditorForm
                                formData={formData}
                                updateFormData={updateFormData}
                                // editingMode={editingMode.current}
                                editingMode={editingMode}
                                handlePost={handlePost}
                                handlePut={handlePut}
                                submitType={submitType.current}
                                _uploadProgress={uploadProgress}
                                formState={formState.current}
                            />

                            <div className='d-flex flex-column gap-5 pt-8'>
                                {/* Upload a new card button */}
                                <button
                                    onClick={handlePost}
                                    className='form-control position-relative'
                                    disabled={
                                        inProgress ||
                                        (editingMode ? !validForModification() : !validForUpload())
                                    }>
                                    <div
                                        className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                        style={{ backgroundColor: "transparent" }}>
                                        <div
                                            className='progress-bar '
                                            style={{
                                                zIndex: -1,
                                                width:
                                                    submitType.current === POST &&
                                                    progressBarLength,
                                                backgroundColor: progressBarColor,
                                            }}
                                        />
                                    </div>
                                    <div className='position-relative z-1 text-capitalize'>
                                        Upload
                                    </div>
                                </button>

                                {/* Modify current card button */}
                                {editingMode && (
                                    <button
                                        onClick={handlePut}
                                        className='form-control position-relative'
                                        disabled={inProgress || !validForModification()}>
                                        <div
                                            className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                            style={{ backgroundColor: "transparent" }}>
                                            <div
                                                className='progress-bar '
                                                style={{
                                                    zIndex: -1,
                                                    width:
                                                        submitType.current === PUT &&
                                                        progressBarLength,
                                                    backgroundColor: progressBarColor,
                                                }}
                                            />
                                        </div>

                                        <div className='position-relative z-1 text-capitalize'>
                                            Modify
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Hidden ImageKit component used for uploading */}
                            <div
                                id='ikupload'
                                className='d-none h-0'>
                                <IKUpload
                                    style={{ display: "none", pointerEvents: "none" }}
                                    onUploadProgress={onUploadProgress}
                                    onSuccess={onSuccess}
                                    onError={onError}
                                    overwriteFile={true}
                                    useUniqueFileName={false}
                                    folder='tours'
                                />
                            </div>
                        </Col>
                    </Row>

                    <div>
                        <p className='mt-5 display-5'>formData</p>
                        <table className='table'>
                            <tbody>
                                {Object.entries(formData).map(function (entry, i) {
                                    return (
                                        <tr key={i}>
                                            <th className='fw-bold'>{entry[0]?.toString()}</th>
                                            <td>{entry[1]?.toString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='mt-5 display-5'>cardData</p>
                        <table className='table'>
                            <tbody>
                                {Object.entries(cardData).map(function (entry, i) {
                                    return (
                                        <tr key={i}>
                                            <th className='fw-bold'>{entry[0]?.toString()}</th>
                                            <td>{entry[1]?.toString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='mt-5 display-5'>cardDataFetched</p>
                        <table className='table'>
                            <tbody>
                                {cardDataFetched &&
                                    Object.entries(cardDataFetched).map(function (entry, i) {
                                        return (
                                            <tr key={i}>
                                                <th className='fw-bold'>{entry[0]?.toString()}</th>
                                                <td>{entry[1]?.toString()}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </IKContext>
            </Section>
        </>
    );

    function handlePost() {
        submitType.current = POST;
        setUploadProgress(0); // restart progress bar
        handleUpload();
        return;

        // if user provided new thumbnail upload it
        if (formData.thumbnail) {
            uploadImage();
        }

        // else use current image
        else {
            fakeLoading({ cycles: 8, cycleDuration: 600 });

            postToDatabase(
                cardData,
                () =>
                    // on success
                    {
                        finishLoading();
                    },
                () => setUploadProgress(-1),
            );
        }
    }

    function handlePut() {
        submitType.current = PUT;
        setUploadProgress(0); //
        handleUpload();
        return;

        if (formData.thumbnail) {
            uploadImage();
        } //if (editingMode.current)
        else {
            // setUploadProgress(1);
            fakeLoading({ cycles: 8 });
            updateDatabase(
                cardID.current,
                cardData,
                () => {
                    finishLoading();
                }, // success
                () => setUploadProgress(-1), // fail
            );
        }
    }

    function handleUpload() {
        // if user provided new thumbnail upload it
        if (formData.thumbnail) {
            consoleLog("UPLOAD IMAGE", { color: colors.attention });
            uploadImage();
        }

        // else use current image
        else {
            fakeLoading({ cycles: 8, cycleDuration: 600 });

            if (submitType.current === POST) {
                consoleLog("POST", { color: colors.attention });
                postToDatabase(
                    cardData,
                    () =>
                        // on success
                        {
                            finishLoading();
                        },
                    () => setUploadProgress(-1),
                );
            }

            if (submitType.current === PUT) {
                consoleLog("PUT", { color: colors.attention });
                updateDatabase(
                    cardData,
                    cardID.current,
                    () => {
                        finishLoading();
                    }, // success
                    () => setUploadProgress(-1), // fail
                );
            }
        }
    }

    async function resolveUpdates() {
        for (let formField in formData) {
            const fieldValue = formData[formField];

            switch (formField) {
                case "thumbnail":
                    if (fieldValue === "") {
                        // if (editingMode.current)
                        if (editingMode) {
                            updateCardData("thumbnailURL", cardDataFetched["thumbnailURL"]);
                        } else {
                            updateCardData("thumbnailURL", "");
                        }
                    } else if (checkInputIsFile(fieldValue)) {
                        await convertImageToString(fieldValue[0]).then((imgDataURL) =>
                            updateCardData("thumbnailURL", imgDataURL),
                        );
                    } else {
                        updateCardData("thumbnailURL", fieldValue);
                    }
                    break;

                case "country":
                    break;

                case "countryKey":
                    updateCardData(formField, fieldValue);
                    updateCardData("country", COUNTRIES[fieldValue]);
                    break;

                default:
                    if (fieldValue === "") {
                        // if (editingMode.current)
                        if (editingMode) updateCardData(formField, cardDataFetched[formField]);
                        else updateCardData(formField, fieldValue);
                    } else {
                        updateCardData(formField, fieldValue);
                    }
            }
        }
    }

    function onUploadProgress(event) {
        console.log("onUploadProgress >>>", event);
        setUploadProgress((0.8 * event.loaded) / event.total);
    }

    function onError(event) {
        console.log("onError >>>", event);
    }

    function onSuccess(response) {
        console.log("onSuccess >>>", response, response.fileId);
        updateCardData("thumbnailID", response.fileId);
        updateCardData("thumbnailURL", response.filePath);
        const newCard = {
            ...cardData,
            thumbnailID: response.fileId,
            thumbnailURL: response.filePath,
        };

        if (submitType.current === PUT) {
            consoleLog('PUT 2', {color: colors.attention})
            updateDatabase(
                newCard,
                cardID.current,
                function () {
                    abortFakeLoading();
                    setUploadProgress(0.8);
                    fakeLoading({ cycles: 2 });
                },
                // () => setUploadProgress(2),
                () => setUploadProgress(-1),
            );
        } else
        consoleLog('POST 2', {color: colors.attention})
            postToDatabase(
                newCard,
                function (r) {
                    // consoleLog('post to database')
                    // consoleLog(uploadProgress)
                    abortFakeLoading();
                    setUploadProgress(0.8);
                    fakeLoading({ cycles: 2 });

                    setTimeout(function () {
                        cardID.current = r.id;
                        navigator("./" + r.id);
                        refRanOnce.current = false;
                    }, 1000);
                },
                () => setUploadProgress(-1),
            );
    }

    async function uploadImage() {
        const value = formData.thumbnail;

        if (value instanceof FileList) {
            const ikupload = document.querySelector("#ikupload > input");
            ikupload.files = value;
            ikupload.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
            uploadImageURL(value);
            fakeLoading();
        }
    }

    async function uploadImageURL(url) {
        SLFunctionRequest({
            params: {
                action: POST,
                file: url,
                fileName: "unsplash_" + url.match(/photo-[a-z0-9-]*/)[0],
                folder: "tours",
                useUniqueFileName: false,
                overwriteFile: true,
            },
        })
            .then((r2) => r2.json())
            .then((r3) => {
                onSuccess(r3);
                // setUploadProgress(0);
            });
    }

    function validForUpload() {
        for (let fieldProperty in formState.current) {
            if (!formState.current[fieldProperty].isValid) return false;
            if (formState.current[fieldProperty].isBlank) return false;
        }

        return true;
    }

    function validForModification() {
        for (let fieldProperty in formState.current) {
            if (!formState.current[fieldProperty].isValid) return false;
        }

        return true;
    }

    function fakeLoading({ cycles = 8, cycleDuration = 600, step = 0.1 } = {}, onFinish) {
        if (loadingIntervalId.current) return;

        loadingIntervalId.current = setInterval(function () {
            setUploadProgress((prev) => prev + step);
        }, 700);

        setTimeout(function () {
            if (onFinish) onFinish();
            clearInterval(loadingIntervalId.current);
            loadingIntervalId.current = null;
        }, cycleDuration * (cycles + 1));
    }

    function abortFakeLoading() {
        if (!loadingIntervalId.current) return;

        clearInterval(loadingIntervalId.current);
        loadingIntervalId.current = null;
    }

    function finishLoading() {
        abortFakeLoading();
        setUploadProgress(0.8);
        fakeLoading({ cycles: 2, cycleDuration: 500 });
    }
}
