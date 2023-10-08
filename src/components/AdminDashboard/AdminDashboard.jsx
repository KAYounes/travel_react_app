import React from "react";
import regeneratorRuntime from "regenerator-runtime";
import { useNavigate, Link } from "react-router-dom";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
//
import Section from "../ui_components/wrappers/Section";
import { MOCKAPI_ENDPOINT } from "../../constants";
import { range } from "../../utils";
//
import TourCard from "../TourCard/TourCard";
import TourCardPlaceholder from "../TourCard/TourCardPlaceholder";
import Col from "../ui_components/wrappers/Col";
import Row from "../ui_components/wrappers/Row";
import CardOverlay from "../CardOverlay/CardOverlay";

function AdminDashboard() {
  const placeholders = 12;

  const [cardData, setCardData] = React.useState([]);
  const navigator = useNavigate();

  const cardPlaceholdersDOM = range(placeholders).map(function () {
    return (
      <Col key={crypto.randomUUID()} mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
        <TourCard cardData={{}} />
      </Col>
    );
  });

  React.useEffect(function () {
    console.log('update')
    fetch(MOCKAPI_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setCardData(data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  console.log("Fetch ", cardData, MOCKAPI_ENDPOINT);
  return (
    <Section>
      <IKContext
        urlEndpoint="https://ik.imagekit.io/lgd9ykfw6/"
        publicKey="public_jYTemusiZpt+yCs8inkps77IdKo="
        authenticator={authenticator}
      >
        <Row mods="row-cols-1 row-cols-sm-2 row-cols-mid-3">
          <Col mods={"col py-8 px-0 px-xsm-4 px-lg-8"}>
            <Link
            to='./edit'
              className="h-100 d-flex flex-column justify-content-center align-items-center rounded-3 text-decoration-none"
              style={{ backgroundColor: "rgba(0 0 0 / 0.5)" }}
            >
              <i className="bi bi-file-plus-fill text-light fs-1"></i>
              <span className="py-5"></span>
              <span className="text-light">Add Tour Package</span>
            </Link>
          </Col>
          {cardsDOM}
          {cardData.length === 0 && cardPlaceholdersDOM}
        </Row>
      </IKContext>
    </Section>
  );

  function handleClickEdit(id) {
    navigator("./edit/" + id);
  }

  function handelClickDelete(id) {
    fetch(MOCKAPI_ENDPOINT + '/' + id, {method: 'delete'}).then(() =>
    removeCard(id))
    
  }

  function removeCard(id){
    setCardData(function(prev){
      return prev.filter((item) => item.id != id)
    })
  }
}

export default AdminDashboard;

const authenticator = async () => {
  try {
    // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };

    const response = await fetch("/.netlify/functions/auth", {
      mode: "no-cors",
      headers: { "Access-Control-Allow-Origin": "*" },
    });

    console.log("response", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
