import React, { useCallback } from "react";
import clsx from "clsx";
import { IKContext, IKUpload } from "imagekitio-react";
//
import styles from "./styles.module.css";
import Section from "../ui_components/wrappers/Section";
import TourCard from "../TourCard/TourCard";
import Row from "../ui_components/wrappers/Row";
import Col from "../ui_components/wrappers/Col";
import CardEditorForm from "../CardEditorForm";
import AdminNavbar from "../AdminNavbar";
//
import { IKIO_PUBKEY, IKIO_ENDPOINT } from "../../constants";
import
    {
        IKUploadAuthenticator,
        SLFunctionRequest,
        getFromDatabase,
        postToDatabase,
        updateDatabase,
    } from "../../fetch.helpers";
import { LoremIpsum, loremIpsum } from "lorem-ipsum";
import { checkInputIsFile, convertImageToString } from "./helpers";
import { COUNTRIES } from "../CardEditorForm/constants";
import { useNavigate } from "react-router-dom";
import { consoleLog } from "../../logging";
import { iterateObject } from "../../utils";
//

export default function AdminCardEditor()
{
    // const cardID = window.location.pathname.match(/(?<=edit\/)\d*/);
    //
    // console.log("RENDERING > AdminCardEditor");
    const navigator = useNavigate();
    const refRanOnce = React.useRef(false);

    // const [editingMode, setEditingMode] = React.useState(false);
    // const [secondaryUpload, setSecondaryUpload] = React.useState(false);
    // const [readyToPost, setReadyToPost] = React.useState(false);
    // const [cardUploadSuccessful, setCardUploadSuccessful] = React.useState();
    const [submitForm, setSubmitForm] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [uploadCard, setUploadCard] = React.useState(false);
    const [submitType, setSubmitType] = React.useState("");

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

    // const cardData = {
    //     thumbnailURL: "",
    //     poi: "",
    //     countryKey: "",
    //     country: "",
    //     city: "",
    //     duration: "",
    //     popularity: "",
    //     rating: "",
    //     priceOriginal: "",
    //     priceOffered: "",
    //     details: "",
    //     thumbnailID: "",
    //     id: "",
    // }

    const [cardDataFetched, setCardDataFetched] = React
        .useState
        //     {
        //     thumbnailURL: "",
        //     poi: "",
        //     countryKey: "",
        //     country: "",
        //     city: "",
        //     duration: "",
        //     popularity: "",
        //     rating: "",
        //     priceOriginal: "",
        //     priceOffered: "",
        //     details: "",
        //     thumbnailID: "",
        //     id: "",
        // }
        ();

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

        // id: "",
        // thumbnailID: "",
        // thumbnailURL: "",
        thumbnail: "",
    });
    //

    //
    const editingMode = window.location.pathname.match(/(?<=edit\/)\d+/);
    // consoleLog(editingMode, {color: '#f66', fontSize: 20})
    const formState = {};

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

    // const updateCardData = useCallback(function(key, value)
    // {
    //     cardData[key] = value
    // }, [])

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
    //

    // consoleLog(JSON.stringify(cardDataFetched), {color: 'white'})

    // if (cardDataFetched)
    // {
    //     for (let key in formData)
    //     {
    //         if (key in cardDataFetched)
    //         {
    //             updateFormData(key, cardDataFetched[key]);
    //         }
    //     }
    // }

    // resolveUpdates()

    // if (submitForm)
    // {
    //     consoleLog(`=> Submit Form:= ${submitForm}`, { color: "#6EBDF5", fontSize: "18" });
    //     // consoleLog(`=> Upload progress:= ${uploadProgress}`, { color: "#6EBDF5", fontSize: "18" });
    //     if (formData.thumbnail)
    //     {
    //         uploadImage();
    //     } else if (editingMode)
    //     {
    //         setUploadProgress(1)
    //         postCardToDatabase(cardData)
    //     }

    //     setSubmitForm(false)
    // }

    //
    React.useEffect(function ()
    {
        // fetch card from db if id found in url
        // const cardID = window.location.pathname.match(/(?<=edit\/)\d+/);

        const cardID = editingMode?.[0];
        // console.log("cardID", editingMode, !cardID);
        if (!cardID) return;
        if (refRanOnce.current) return;

        getFromDatabase({ id: cardID[0] }).then(function (r)
        {
            // console.log("get", r, r[0]);

            const card = r[0];
            setCardDataFetched(card);

            for (let key in formData)
            {
                if (key in card)
                {
                    updateFormData(key, card[key]);
                }
            }

            // setUploadProgress(0)
            // setEditingMode(true);
        });
        refRanOnce.current = true;
    }, []);

    // React.useEffect(
    //     // When editing a card, update the form to match the fetched data.
    //     function ()
    //     {
    //         if (!editingMode) return;

    //         for (let key in formData)
    //         {
    //             if (key in cardDataFetched)
    //             {
    //                 updateFormData(key, cardDataFetched[key]);
    //             }
    //         }
    //     },
    //     [cardDataFetched],
    // );

    React.useEffect(
        // When form is updated, map updates to card
        function ()
        {
            resolveUpdates();
        },
        [formData],
    );

    // React.useEffect(function(){
    //   // if(submitForm)
    //   if(cardData.thumbnailID) setReadyToPost(true)
    // },[cardData])

    //
    // React.useEffect(function(){
    //   if(! submitForm) return
    //   if(! readyToPost) return
    //   console.log("> > > UPLOADING TO DATABASE", cardData)
    // }, [submitForm])

    React.useEffect(
        function ()
        {
            // if (!submitForm) return;
            // setUploadProgress(0);
            // // consoleLog(`=> Submit Form:= ${submitForm}`, { color: "#6EBDF5", fontSize: "18" });
            // // consoleLog(`=> Upload progress:= ${uploadProgress}`, { color: "#6EBDF5", fontSize: "18" });
            // if (formData.thumbnail)
            // {
            //     uploadImage();
            // } else if (editingMode)
            // {
            //     setUploadProgress(1);
            //     updateDatabase(
            //         editingMode,
            //         cardData,
            //         () => setUploadProgress(2),
            //         () => setUploadProgress(-1),
            //     );
            // }
            // setSubmitForm(false);
        },
        [submitForm],
    );

    // React.useEffect(function(){
    //     if(!uploadCard) return

    //     postCardToDatabase()
    //     setUploadCard(false)
    // }, [uploadCard])

    // React.useEffect(function(){
    //     // if(! submitForm) return
    //     if(! cardData.thumbnailURL) return
    //     if(! /^data:image.*/.test(cardData.thumbnailURL)) setUploadCard(true)
    // }, [cardData])

    function postCardToDatabase(body, onSuccess, onFail)
    {
        // consoleLog("uploading to database", { color: "#A9F56E", fontSize: 18 });
        // return;
        // consoleLog(JSON.stringify(body), { color: "#F5F06E" });
        postToDatabase(body)
            .then(function (r)
            {
                onSuccess(r);
                // console.log({ post: r });
                // setCardUploadSuccessful(true);
                // navigator("./" + r.id, { replace: true });
            })
            .catch(function (err)
            {
                onFail(err);
                // console.log("> Card upload failed");
                // setCardUploadSuccessful(false);
            });
    }

    //
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
                            {/* Using Memo */}
                            {/* {CardEditorFormMemo} */}

                            {/* W/O Memo */}
                            <CardEditorForm
                                formData={formData}
                                updateFormData={updateFormData}
                                formState={formState}
                                editingMode={editingMode}
                                // cardUploadSuccessful={cardUploadSuccessful}
                                // _readyToPost={[readyToPost, setReadyToPost]}
                                // _secondaryUpload={[secondaryUpload, setSecondaryUpload]}
                                // _submitForm={[submitForm, setSubmitForm]}
                                handleUpload={handleUpload}
                                handleModify={handleModify}
                                submitType={submitType}
                                _uploadProgress={uploadProgress}
                            />
                            <div className="d-flex flex-column gap-5 pt-8">
                            <button
                                onClick={handleUpload}
                                className='form-control position-relative'
                                disabled={!isFormValidCheck() || submitForm}>
                                <div
                                    className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                    style={{ backgroundColor: "transparent" }}>
                                    <div
                                        className='progress-bar '
                                        style={{
                                            width: `${submitType === 'upload' ? uploadProgress * 80 + (uploadProgress && 10) : 0}%a`,
                                            zIndex: -1,
                                            backgroundColor:
                                                uploadProgress < 0 ? "#E88484" : "#bce784",
                                        }}></div>
                                </div>
                                <div className='position-relative z-1 text-capitalize'>
                                    {"upload"}
                                </div>
                            </button>
                            {editingMode && (
                                <button
                                    onClick={handleModify}
                                    className='form-control position-relative'
                                    disabled={!isFormValidCheck() || submitForm}>
                                    <div
                                        className='progress position-absolute top-0 end-0 bottom-0 start-0 h-100 w-100 z-0'
                                        style={{ backgroundColor: "transparent" }}>
                                        <div
                                            className='progress-bar '
                                            style={{
                                                width: `${submitType === 'modify' ? uploadProgress * 80 + (uploadProgress && 10) : 0}%a`,
                                                zIndex: -1,
                                                backgroundColor:
                                                    uploadProgress < 0 ? "#E88484" : "#bce784",
                                            }}></div>
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
                                {Object.entries(formData).map(function (entry)
                                {
                                    return (
                                        <tr>
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
                                {Object.entries(cardData).map(function (entry)
                                {
                                    return (
                                        <tr>
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
    //

    function handleUpload()
    {
        // if (!submitForm) return;
        setUploadProgress(0);
        // consoleLog(`=> Submit Form:= ${submitForm}`, { color: "#6EBDF5", fontSize: "18" });
        // consoleLog(`=> Upload progress:= ${uploadProgress}`, { color: "#6EBDF5", fontSize: "18" });
        if (formData.thumbnail)
        {
            uploadImage();
            setSubmitType("upload");
        } else if (editingMode)
        {
            setUploadProgress(1);
            updateDatabase(
                editingMode,
                cardData,
                () => setUploadProgress(2),
                () => setUploadProgress(-1),
            );
        }

        // setSubmitForm(false);
    }
    function handleModify()
    {
        // if (!submitForm) return;
        setUploadProgress(0);
        // consoleLog(`=> Submit Form:= ${submitForm}`, { color: "#6EBDF5", fontSize: "18" });
        // consoleLog(`=> Upload progress:= ${uploadProgress}`, { color: "#6EBDF5", fontSize: "18" });
        if (formData.thumbnail)
        {
            uploadImage();
            setSubmitType("modify");
        } else if (editingMode)
        {
            setUploadProgress(1);
            updateDatabase(
                editingMode,
                cardData,
                () => setUploadProgress(2),
                () => setUploadProgress(-1),
            );
        }

        // setSubmitForm(false);
    }

    //
    async function resolveUpdates()
    {
        // consoleLog("resolve", { color: "#F5F06E" });
        // $1Log(JSON.stringify(formData), { color: "#F5F06E" });

        for (let formField in formData)
        {
            // const fieldData = formState[formField];
            const fieldValue = formData[formField];
            // console.log(formField, fieldData, { fieldValue });

            // console.log(formState[formField])

            // if (!formState[formField].isValid) return;

            switch (formField)
            {
                case "thumbnail":
                    if (fieldValue === "")
                    {
                        if (editingMode)
                            updateCardData("thumbnailURL", cardDataFetched["thumbnailURL"]);
                        else updateCardData("thumbnailURL", "");
                    } else if (checkInputIsFile(fieldValue))
                    {
                        await convertImageToString(fieldValue[0]).then((imgDataURL) =>
                            updateCardData("thumbnailURL", imgDataURL),
                        );
                    } else
                    {
                        updateCardData("thumbnailURL", fieldValue);
                    }
                    break;

                case "countryKey":
                    updateCardData(formField, fieldValue);
                    updateCardData("country", COUNTRIES[fieldValue]);
                    break;

                default:
                    // consoleLog("fieldValue ", fieldValue);
                    if (fieldValue === "")
                    {
                        if (editingMode) updateCardData(formField, cardDataFetched[formField]);
                    } else updateCardData(formField, fieldValue);
            }
        }

        // if (formData.thumbnailID)
        // {
        //     updateCardData("thumbnailURL", formData.thumbnailURL);
        //     updateCardData("thumbnailID", formData.thumbnailID);
        // }

        // for (let fieldProperty in formFields) {
        // const value = cardData[fieldProperty];
        // console.log(fieldProperty)

        //   if (!formFields[fieldProperty].isValid)
        //     updateCardData(fieldProperty, null);
        //   else {
        //     // console.log(fieldProperty, value ? { value } : "-");
        //     switch (fieldProperty) {
        //       case "thumbnail":
        //         // console.log(value, editMode)
        //         if (!value) {
        //           updateCardData("thumbnailURL", cardData.thumbnailURL);
        //         } else if (checkFileExist(value))
        //           await convertImageToString(value[0]).then((img) =>
        //             updateCardData("thumbnailURL", img)
        //           );
        //         else updateCardData("thumbnailURL", value);
        //         break;

        //       case "countryKey":
        //         updateCardData("countryKey", value);
        //         updateCardData("country", COUNTRIES[value]);
        //         break;

        //       default:
        //         updateCardData(fieldProperty, value);
        //         break;
        //     }
        //   }
        // }
    }

    function onUploadProgress(event)
    {
        console.log("onUploadProgress >>>", event);
        setUploadProgress(event.loaded / event.total);
    }

    function onError(event)
    {
        console.log("onError >>>", event);
    }

    function onSuccess(response)
    {
        console.log("onSuccess >>>", response);
        // updateFormData("thumbnailID", response.fileId);
        // updateFormData("thumbnailURL", response.filePath);
        updateCardData("thumbnailID", response.fileId);
        updateCardData("thumbnailURL", response.filePath);
        const newCard = {
            ...cardData,
            thumbnailID: response.fileId,
            thumbnailURL: response.filePath,
        };

        if (editingMode)
            updateDatabase(
                editingMode,
                newCard,
                () => setUploadProgress(2),
                () => setUploadProgress(-1),
            );
        else
            postToDatabase(
                newCard,
                function (r)
                {
                    setUploadProgress(2);
                    setTimeout(function ()
                    {
                        navigator("./" + r.id);
                        setUploadProgress(0);
                    }, 1000);
                },
                () => setUploadProgress(-1),
            );
        // setUploadCard(true)
    }
    // setUploadCard(true)

    async function uploadImage()
    {
        // return new Promise(function (resolve, reject){
        // const value = formData.thumbnail;

        // if (value instanceof FileList)
        // {
        //     const ikupload = document.querySelector("#ikupload > input");
        //     ikupload.files = value;
        //     ikupload.dispatchEvent(new Event("change", { bubbles: true }));
        // } else
        // {
        //     uploadImageURL(value);
        // }
        // })

        const value = formData.thumbnail;

        if (value instanceof FileList)
        {
            // consoleLog("upload image from file", { color: "red" });
            const ikupload = document.querySelector("#ikupload > input");
            ikupload.files = value;
            ikupload.dispatchEvent(new Event("change", { bubbles: true }));
        } else
        {
            uploadImageURL(value);
            setUploadProgress(0.5);
        }
    }

    async function uploadImageURL(url)
    {
        // consoleLog("uploadImageURL", { color: "red" });
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
                setUploadProgress(1);
            });
    }

    function isFormValidCheck()
    {
        return true
        // if (editingMode) return true;

        for (let fieldProperty in formState)
        {
            if (!formState[fieldProperty].isValid) return false;
            if (!editingMode) if (formState[fieldProperty].isBlank) return false;
        }

        return true;
    }
}
