import React from "react";
import "regenerator-runtime";
import { useNavigate, Link } from "react-router-dom";
import { IKContext } from "imagekitio-react";
import clsx from "clsx";
//
import styles from "./styles.module.css";
import Section from "../ui_components/wrappers/Section";
import TourCard from "../TourCard/TourCard";
import Col from "../ui_components/wrappers/Col";
import Row from "../ui_components/wrappers/Row";
import CardOverlay from "../CardOverlay/CardOverlay";
//
import { MOCKAPI_ENDPOINT } from "../../constants";
import { range } from "../../utils";
import { IKUploadAuthenticator } from "../../fetch.helpers";

export default function AdminDashboard() {
  const placeholders = 12;

  const navigator = useNavigate();
  const [cardData, setCardData] = React.useState([]);
  const [deleteEvent, setDeleteEvent] = React.useState();

  const cardPlaceholdersDOM = range(placeholders).map(function (_, i) {
    return (
      <Col key={i} mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
        <TourCard cardData={{}} />
      </Col>
    );
  });

  // Fetch data from database
  React.useEffect(function () {
    fetch(MOCKAPI_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch data from database
  React.useEffect(
    function () {
      removeCard(deleteEvent);
    },
    [deleteEvent]
  );

  const cardsDOM = cardData.map(function (card) {
    return (
      <Col key={card.id} mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
        <CardOverlay
          handleDelete={() => handelClickDelete(card.id)}
          handleEdit={() => handleClickEdit(card.id)}
        >
          <TourCard cardData={card} />
        </CardOverlay>
      </Col>
    );
  });

  return (
    <Section>
      <IKContext
        urlEndpoint="https://ik.imagekit.io/lgd9ykfw6/"
        publicKey="public_jYTemusiZpt+yCs8inkps77IdKo="
        authenticator={IKUploadAuthenticator}
      >
        <Row mods="row-cols-1 row-cols-sm-2 row-cols-mid-3">
          <Col mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
            <AddCardButton />
          </Col>
         { cardData.length === 0 &&
         <Col mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
            <EmptyCard />
          </Col>}
          {cardsDOM}
          {/* {cardData.length === 0 && } */}
        </Row>
      </IKContext>
    </Section>
  );

  function handleClickEdit(id) {
    navigator("./edit/" + id);
  }

  function handelClickDelete(id) {
    fetch(MOCKAPI_ENDPOINT + "/" + id, { method: "delete" }).then(() =>
      setDeleteEvent(id)
    );
  }

  function removeCard(id) {
    setCardData(function (prev) {
      return prev.filter((item) => item.id != id);
    });
  }
}

function AddCardButton() {
  return (
    <Link to="./edit" className="text-decoration-none">
      {/* <div style={{ minHeight: 400 }}> */}
      <div className={clsx(styles.addCardBtn)} style={{ minHeight: 400 }}>
        <i className="bi-thin bi-file-plus-fill"></i>
      </div>
    </Link>
    // </div>
  );
}
function EmptyCard() {
  return (
    <div className="h-100" style={{ minHeight: 400 }}>
      <p className="text-muted h-100 w-100 d-flex text-center display-6 fw-medium border border-3 rounded-3 justify-content-center align-items-center bg-secondary" style={{lineHeight: 1.5}}>
        you have
        {/* <br /> */}
        <br />
        no tours
        <br />
        yet
      </p>
    </div>
  );
}
