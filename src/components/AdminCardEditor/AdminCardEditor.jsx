import React from "react";
import clsx from "clsx";
import { IKContext, } from "imagekitio-react";
//
import styles from "./styles.module.css";
import Section from "../ui_components/wrappers/Section";
import TourCard from "../TourCard/TourCard";
import Row from "../ui_components/wrappers/Row";
import Col from "../ui_components/wrappers/Col";
import CardEditorForm from "../CardEditorForm";
import AdminNavbar from "../AdminNavbar";
//
import {
  IKIO_PUBKEY,
  IKIO_ENDPOINT,
} from "../../constants";
import { IKUploadAuthenticator, } from "./helpers";
//

export default function AdminCardEditor() {

  const [cardData, setCardData] = React.useState({
    thumbnailSrc: "",
    countryKey: "",
    country: "",
    city: "",
    duration: "",
    popularity: "",
    rating: "",
    priceOriginal: "",
    priceOffered: "",
    details: "",
    poi: "",
    thumbnailID: "",
    id: "",
  });

  return (
    <>
      <AdminNavbar goseTo='/admin' backButtonText="Dashboard" subTitle="Add Tour Package" />
      <Section>
        <IKContext
          urlEndpoint={IKIO_ENDPOINT}
          publicKey={IKIO_PUBKEY}
          authenticator={IKUploadAuthenticator}
        >
          <Row mods={clsx("gx-5")}>
            <Col mods={"col-4"}>
              <div className="position-sticky top-5" style={{height: 'min-content'}}>
                <TourCard cardData={cardData} />
              </div>
            </Col>

            <Col mods={"col-7"}>
              <CardEditorForm updateCardDate={updateCardDate}/>
            </Col>
          </Row>
        </IKContext>
      </Section>
    </>
  );

  function updateCardDate(key, value) {
    // setCardData(updated)
    setCardData(function(prev){
      return {
        ...prev,
        [key]: value
      }
    })
  }

  function onSuccess(arg) {
    updateCardDate("ThumbnailSrc", arg.filePath);
  }

  function onFail(arg) {
    console.log("Fail> ", arg);
  }

  function onUploadProgress(progress) {
    // setUploadProgress(progress.loaded / progress.total);
  }

  async function uploadImage() {
    // const image = stubIKUpload.current.files;
    // if (!image) return;

    // setUploadProgress(0.05);

    // const ikupload = document.querySelector("#ikupload > input");
    // ikupload.files = image;
    // ikupload.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
