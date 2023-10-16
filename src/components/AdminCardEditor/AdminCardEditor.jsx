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
import { IKUploadAuthenticator, getFromDatabase } from "../../fetch.helpers";
import { LoremIpsum } from "lorem-ipsum";
//

export default function AdminCardEditor() {
  console.log('RENDERING > AdminCardEditor')

  const [cardData, setCardData] = React.useState({});
  const cardID = window.location.pathname.match(/(?<=edit\/)\d*/);

  const updateCardData = useCallback(function (key, value) {
    setCardData(function (prev) {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  // console.log('cardData',cardData.id,  cardData)

  React.useEffect(function(){
    const cardID = window.location.pathname.match(/(?<=edit\/)\d+/);
    console.log({cardID}, ! cardID)
    if (! cardID) return 

    getFromDatabase({id: cardID[0]}).then(function(r){
      console.log('r', r[0])
      setCardData(r[0])
    })
  }, [])


  return (
    <>
      <AdminNavbar
        goseTo="/admin"
        backButtonText="Dashboard"
        subTitle="Add Tour Package"
      />
      <Section>
        <IKContext
          urlEndpoint={IKIO_ENDPOINT}
          publicKey={IKIO_PUBKEY}
          authenticator={IKUploadAuthenticator}
        >
          <Row mods={clsx("gx-5")}>
            <Col mods={"col-4"}>
              <div
                className="position-sticky top-5"
                style={{ height: "min-content" }}
              >
                <TourCard cardData={cardData} />
              </div>
            </Col>

            <Col mods={"col-7"}>
              {React.useMemo(
                function () {
                  console.log('cardData',cardData.id,  cardData)

                  return (
                    <CardEditorForm
                      updateCardData={updateCardData}
                      cardData={cardData}
                    />
                  );
                },
                [updateCardData, cardData]
              )}
            </Col>
          </Row>
        </IKContext>
      </Section>
    </>
  );
}


