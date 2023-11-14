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
import { IKUploadAuthenticator, SLFunctionRequest } from "../../fetch.helpers";

export default function AdminDashboard() {
  // SLFunctionRequest()
  const placeholders = 12;

  const navigator = useNavigate();
  const [cardData, setCardData] = React.useState([]);
  const [fetchingData, setFetchingData] = React.useState(true);
  const [lastUpdate, setLastUpdate] = React.useState();
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
    fetchData()
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
      <div className="mb-8 text-center d-flex flex-column gap-3">
        <button className="form-control" style={{backgroundColor: '#E8F7D4'}}onClick={handleClickUpdate}>Update</button>
        <span className="form-text" style={{}}  onClick={handleClickUpdate}>Last update {lastUpdate}</span>
      </div>

      <IKContext
        urlEndpoint="https://ik.imagekit.io/lgd9ykfw6/"
        publicKey="public_jYTemusiZpt+yCs8inkps77IdKo="
        authenticator={IKUploadAuthenticator}
      >
        <Row mods="row-cols-1 row-cols-sm-2 row-cols-mid-3 position-relative">
          {fetchingData && <LoadingOverlay />}
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
          {/* </LoadingOverlay> */}
      </IKContext>
    </Section>
  );
  
function handleClickUpdate()
{
  setFetchingData(true)
  fetchData()
}

function fetchData(){
  fetch(MOCKAPI_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
        setLastUpdate(() => (new Date()).toLocaleString('en-us', {day: '2-digit', weekday: 'short', month: 'short', hour:'2-digit', minute:'2-digit'}))
        setTimeout(() => setFetchingData(false), 1000)
      })
      .catch((err) => console.log(err));
}

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

function LoaderSection({ loading, children })
{
  return (
    <Section>
      {children}
    <div className="position-absolute w-100 h-100 top-0 end-0 bottom-0 start-0" style={{backgroundColor: 'red'}}>
    </div>
    </Section>
  )
}

function LoadingOverlay(){
  return(
      // <div className="position-relative">
    <div className="position-absolute w-100 h-100" style={{backgroundColor: 'rgba(34 34 34 / 0.5)',zIndex: 1, pointerEvents: "", opacity: 1, backdropFilter: "blur(4px)", borderRadius: 10}}>
      <div style={{position: 'sticky', textAlign: 'center', top: '30vh', marginTop: '20%'}}>
      <div className="spinner-border" style={{color: "white"}}></div>
      </div>
  </div>
  )
}