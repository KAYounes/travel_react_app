import React, { useCallback } from "react";
import clsx from "clsx";
import { IKContext } from "imagekitio-react";
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
import { IKUploadAuthenticator, getFromDatabase, postToDatabase } from "../../fetch.helpers";
import { LoremIpsum, loremIpsum } from "lorem-ipsum";
import { checkInputIsFile, convertImageToString } from "./helpers";
import { COUNTRIES } from "../CardEditorForm/constants";
import { useNavigate } from "react-router-dom";
//

export default function AdminCardEditor()
{
  // const cardID = window.location.pathname.match(/(?<=edit\/)\d*/);
  //
  // console.log("RENDERING > AdminCardEditor");
  const navigator = useNavigate();

  // const [editingMode, setEditingMode] = React.useState(false);
  const [secondaryUpload, setSecondaryUpload] = React.useState(false);
  const [readyToPost, setReadyToPost] = React.useState(false);
  const [cardUploadSuccessful, setCardUploadSuccessful] = React.useState(); 
  const editingMode = window.location.pathname.match(/(?<=edit\/)\d+/);
  
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

  const [cardDataFetched, setCardDataFetched] = React.useState({
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

  const [formData, setFormData] = React.useState({
    thumbnailURL: "",
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

    thumbnailID: "",
    id: "",
    thumbnail: "",
  });

  // const [formState]

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

  React.useEffect(function ()
  {
    // const cardID = window.location.pathname.match(/(?<=edit\/)\d+/);
    const cardID = editingMode?.[0]
    console.log("cardID", editingMode, !cardID);
    if (!cardID) return;

    getFromDatabase({ id: cardID[0] }).then(function (r)
    {
      console.log("get", r[0]);
      setCardDataFetched(r[0]);
      // setEditingMode(true);
    });
  }, []);

  React.useEffect(
    function ()
    {
      if (!editingMode) return;

      for (let key in formData)
      {
        // console.log({key}, key in cardDataFetched)
        if (key in cardDataFetched)
        {
          updateFormData(key, cardDataFetched[key]);
        }
      }

      // setReadyToPost(false);
      // setCardUploadSuccessful(undefined);
    },
    [cardDataFetched],
  );

  React.useEffect(
    function ()
    {
      console.log({'cardData.thumbnailID':   cardData.thumbnailID})
      if(editingMode) if(!secondaryUpload) return
      if (cardData.thumbnailID)
      {
        setReadyToPost(true);
      }
    },
    [cardData],
  );

  //
  const CardEditorFormMemo = React.useMemo(
    function ()
    {
      // console.log('cardData',cardData.id,  cardData)

      return <CardEditorForm updateCardData={updateCardData} cardData={cardData} />;
    },
    [updateCardData, cardData],
  );

  const formState = {};
  React.useEffect(
    function ()
    {
      resolveUpdates();
    },
    [formData],
  );

  React.useEffect(
    function ()
    {
      console.log({ readyToPost });
      if (readyToPost)
      {
        console.log("uploading to database");
        postToDatabase(cardData)
          .then(function (r)
          {
            console.log({ 'post': r });
            setCardUploadSuccessful(true);
            // navigator("./" + r.id, { replace: true });
          })
          .catch(function (err)
          {
            console.log("> Card upload failed");
            setCardUploadSuccessful(false);
          });

        setReadyToPost(false);
      }
    },
    [readyToPost],
  );

  return (
    <>
      <AdminNavbar goseTo='/admin' backButtonText='Dashboard' subTitle='Add Tour Package' />
      <Section>
        <IKContext
          urlEndpoint={IKIO_ENDPOINT}
          publicKey={IKIO_PUBKEY}
          authenticator={IKUploadAuthenticator}
        >
          <Row mods={clsx("gx-5")}>
            <Col mods={"col-4"}>
              <div
                className='position-sticky top-5'
                style={{ height: "min-content" }}
              >
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
                cardUploadSuccessful={cardUploadSuccessful}
                _readyToPost={[readyToPost, setReadyToPost]}
                _secondaryUpload={[secondaryUpload, setSecondaryUpload]}
              />
            </Col>
          </Row>
        </IKContext>
      </Section>
    </>
  );

  async function resolveUpdates()
  {
    for (let formField in formState)
    {
      const fieldData = formState[formField];
      const fieldValue = formData[formField];
      // console.log(formField, fieldData, { fieldValue });

      if (!formState[formField].isValid) return;

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
          if (fieldValue === "")
          {
            if (editingMode) updateCardData(formField, cardDataFetched[formField]);
          } else updateCardData(formField, fieldValue);
      }
    }

    if (formData.thumbnailID)
    {
      updateCardData("thumbnailURL", formData.thumbnailURL);
      updateCardData("thumbnailID", formData.thumbnailID);
    }

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
}
