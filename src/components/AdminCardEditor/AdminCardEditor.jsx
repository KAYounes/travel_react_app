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
import
    {
        IKUploadAuthenticator,
        SLFunctionRequest,
        getFromDatabase,
        postToDatabase,
        updateDatabase,
    } from "../../fetch.helpers";
import { consoleLog } from "../../logging";
import { COUNTRIES } from "../CardEditorForm/constants";
import { checkInputIsFile, convertImageToString } from "./helpers";
//
//
//
export default function AdminCardEditor()
{
    const navigator = useNavigate();
    const refRanOnce = React.useRef(false);
    const formState = React.useRef({});
    const submitType = React.useRef("modify");
    const imageForm = React.useRef();
    const editingMode = React.useRef(false);
    const loadingIntervalId = React.useRef();
    const cardID = React.useRef();
    cardID.current = window.location.pathname.match(/(?<=edit\/)\d+/)?.[0]

    // const [submitType, setSubmitType] = React.useState("");
    // const [cardID, setCardID] = React.useState(window.location.pathname.match(/(?<=edit\/)\d+/)?.[0]);
    // setCardID(window.location.pathname.match(/(?<=edit\/)\d+/)?.[0])

    const [uploadProgress, setUploadProgress] = React.useState(0);
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
    const [cardDataFetched, setCardDataFetched] = React.useState();
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

    //

    // const editingMode = window.location.pathname.match(/(?<=edit\/)\d+/);
    const progressBarLength = uploadProgress * 90 + (uploadProgress && 10) + "%";
    const progressBarColor =
        (uploadProgress < 0 && "#E88484") ||
        // (uploadProgress < 0 && '#E88484') ||
        (uploadProgress < 1 && "#bce784") ||
        (uploadProgress === 1 && "#E8F7D4");
    // consoleLog(JSON.stringify({uploadProgress, progressBarColor, progressBarLength}), {fontSize: 30})
    //

    const updateCardData = useCallback(function (key, value)
    {
        setCardData(function (prev)
        {
            return {
                ...prev,
                [key]: value,
            };
        });
    }, []);
    const updateFormData = useCallback(function (key, value)
    {
        setFormData(function (prev)
        {
            return {
                ...prev,
                [key]: value,
            };
        });
    }, []);

    ////////////////////////////////////////////////////////////////////////////////////

    React.useEffect(function ()
    {
        consoleLog("Fetch Card", { color: colors.attention, fontSize: 18 });
        consoleLog(cardID.current, { color: colors.attention, fontSize: 18 });
        if (!cardID.current) return;
        if (refRanOnce.current) return;

        getFromDatabase(
            { id: cardID.current },
            function (data)
            {
                consoleLog("Card Fetched", { color: colors.success, fontSize: 18 });
                consoleLog(data, { color: colors.success, fontSize: 18 });
                editingMode.current = Boolean(cardID.current);
                const card = data[0];

                if (!card) return navigator("../admin");

                setCardDataFetched(card);

                for (let key in formData)
                {
                    if (key in card)
                    {
                        updateFormData(key, card[key]);
                    }
                }
            },
            (err) => consoleLog(`Failed Fetch card ${err}`, { color: colors.fail }),
        );
        refRanOnce.current = true;
    }, []);

    React.useEffect(
        function ()
        {
            resolveUpdates();
        },
        [formData],
    );

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
                                editingMode={editingMode.current}
                                handleUpload={handleUpload}
                                handleModify={handleModify}
                                submitType={submitType.current}
                                _uploadProgress={uploadProgress}
                                formState={formState.current}
                            />

                            <div className='d-flex flex-column gap-5 pt-8'>
                                <button
                                    onClick={handleUpload}
                                    className='form-control position-relative'
                                    disabled={editingMode.current ? !validForModification() : !validForUpload()}>
                                    <div
                                        className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                        style={{ backgroundColor: "transparent" }}>
                                        <div
                                            className='progress-bar '
                                            style={{
                                                zIndex: -1,
                                                width: submitType.current === "upload" && progressBarLength,
                                                backgroundColor: progressBarColor,
                                            }}
                                        />
                                    </div>
                                    <div className='position-relative z-1 text-capitalize'>
                                        Upload
                                    </div>
                                </button>
                                {editingMode.current && (
                                    <button
                                        onClick={handleModify}
                                        className='form-control position-relative'
                                        disabled={!validForModification()}>
                                        <div
                                            className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                            style={{ backgroundColor: "transparent" }}>
                                            <div
                                                className='progress-bar '
                                                style={{
                                                    zIndex: -1,
                                                    width: submitType.current === "modify" && progressBarLength,
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
                                {Object.entries(formData).map(function (entry, i)
                                {
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
                                {Object.entries(cardData).map(function (entry, i)
                                {
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
                                    Object.entries(cardDataFetched).map(function (entry, i)
                                    {
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

    function handleUpload()
    {
        setUploadProgress(0);
        // setSubmitType("upload");
        submitType.current = "upload";
        consoleLog("upload", { color: colors.attention });

        if (formData.thumbnail)
        {
            consoleLog("upload > 1", { color: colors.attention });
            uploadImage();
        } else
        {
            consoleLog("upload > 2", { color: colors.attention });

            // setUploadProgress(1);
            fakeLoading({ cycles: 8, cycleDuration: 600 });
            postToDatabase(
                cardData,
                () =>
                {
                    abortFakeLoading();
                    setUploadProgress(0.8);
                    fakeLoading({ cycles: 2, cycleDuration: 500 });
                },
                () => setUploadProgress(-1),
            );
        }
    }

    function handleModify()
    {
        consoleLog("modify", { color: colors.attention });
        setUploadProgress(0);
        // setSubmitType("modify");
        submitType.current = "modify";

        if (formData.thumbnail)
        {
            consoleLog("modify > 1", { color: colors.attention });
            uploadImage();
        } //if (editingMode.current)
        else
        {
            consoleLog("modify > 2", { color: colors.attention });
            // setUploadProgress(1);
            fakeLoading({ cycles: 8 });
            updateDatabase(
                cardID.current,
                cardData,
                () =>
                {
                    abortFakeLoading();
                    setUploadProgress(0.8);
                    fakeLoading({ cycles: 2, cycleDuration: 500 });
                }, // success
                () => setUploadProgress(-1), // fail
            );
        }
    }

    async function resolveUpdates()
    {
        consoleLog("resolve", { color: colors.attention });
        for (let formField in formData)
        {
            const fieldValue = formData[formField];

            switch (formField)
            {
                case "thumbnail":
                    if (fieldValue === "")
                    {
                        consoleLog(1, { color: colors.attention });
                        if (editingMode.current)
                        {
                            consoleLog(2, { color: colors.attention });
                            updateCardData("thumbnailURL", cardDataFetched["thumbnailURL"]);
                        } else
                        {
                            updateCardData("thumbnailURL", "");
                            consoleLog(3, { color: colors.attention });
                        }
                    } else if (checkInputIsFile(fieldValue))
                    {
                        consoleLog(4, { color: colors.attention });
                        await convertImageToString(fieldValue[0]).then((imgDataURL) =>
                            updateCardData("thumbnailURL", imgDataURL),
                        );
                    } else
                    {
                        consoleLog(5, { color: colors.attention });
                        updateCardData("thumbnailURL", fieldValue);
                    }
                    break;

                case "country":
                    break;

                case "countryKey":
                    consoleLog(6, { color: colors.attention });
                    updateCardData(formField, fieldValue);
                    updateCardData("country", COUNTRIES[fieldValue]);
                    break;

                default:
                    consoleLog(7, { color: colors.attention });
                    if (fieldValue === "")
                    {
                        consoleLog(8, { color: colors.attention });
                        if (editingMode.current)
                            updateCardData(formField, cardDataFetched[formField]);
                    } else
                    {
                        updateCardData(formField, fieldValue);
                        consoleLog(9, { color: colors.attention });
                    }
            }
        }
    }

    function onUploadProgress(event)
    {
        console.log("onUploadProgress >>>", event);
        setUploadProgress(0.8 * event.loaded / event.total);
    }

    function onError(event)
    {
        console.log("onError >>>", event);
    }

    function onSuccess(response)
    {
        console.log("onSuccess >>>", response, response.fileId);
        updateCardData("thumbnailID", response.fileId);
        updateCardData("thumbnailURL", response.filePath);
        const newCard = {
            ...cardData,
            thumbnailID: response.fileId,
            thumbnailURL: response.filePath,
        };

        // consoleLog(submitType.current, { color: colors.attention, fontSize: 20 });

        if (submitType.current === "modify")
            updateDatabase(
                editingMode.current,
                newCard,
                // () => setUploadProgress(2),
                // () => setUploadProgress(-1),
            );
        else
            postToDatabase(
                newCard,
                function (r)
                {
                    // setUploadProgress(2);
                    setTimeout(function ()
                    {
                        navigator("./" + r.id);
                        abortFakeLoading();
                        setUploadProgress(0.8)
                        fakeLoading({cycles: 2});
                    }, 1000);
                },
                // () => setUploadProgress(-1),
            );
    }

    async function uploadImage()
    {
        const value = formData.thumbnail;

        if (value instanceof FileList)
        {
            const ikupload = document.querySelector("#ikupload > input");
            ikupload.files = value;
            ikupload.dispatchEvent(new Event("change", { bubbles: true }));
        } else
        {
            uploadImageURL(value);
            fakeLoading()
        }
    }

    async function uploadImageURL(url)
    {
        SLFunctionRequest({
            params: {
                action: "upload",
                file: url,
                fileName: "unsplash_" + url.match(/photo-[a-z0-9-]*/)[0],
                folder: "tours",
                useUniqueFileName: false,
                overwriteFile: true,
            },
        })
            .then((r2) => r2.json())
            .then((r3) =>
            {
                onSuccess(r3);
                // setUploadProgress(0);
            });
    }

    function validForUpload()
    {
        for (let fieldProperty in formState.current)
        {
            if (!formState.current[fieldProperty].isValid) return false;
            if (formState.current[fieldProperty].isBlank) return false;
        }

        return true;
    }

    function validForModification()
    {
        for (let fieldProperty in formState.current)
        {
            if (!formState.current[fieldProperty].isValid) return false;
        }

        return true;
    }

    function fakeLoading({ cycles = 8, cycleDuration = 600, step = 0.1 } = {}, onFinish)
    {
        if (loadingIntervalId.current) return;

        loadingIntervalId.current = setInterval(function ()
        {
            setUploadProgress((prev) => prev + step);
        }, 700);

        setTimeout(function ()
        {
            if (onFinish) onFinish();
            clearInterval(loadingIntervalId.current);
            loadingIntervalId.current = null;
        }, cycleDuration * (cycles + 1));
    }

    function abortFakeLoading()
    {
        if (!loadingIntervalId.current) return;

        clearInterval(loadingIntervalId.current);
        loadingIntervalId.current = null;
    }
}
