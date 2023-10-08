import styles from "./trendy_packages_section.module.css";
// import fetchedData from "/src/assets/data.json"
import clsx from "clsx";
import Section from "/src/components/ui_components/wrappers/Section.jsx";
import Content from "/src/components/ui_components/wrappers/Content.jsx";
import Header from "/src/components/ui_components/headers/Header.jsx";
import Row from "/src/components/ui_components/wrappers/Row.jsx";
import Col from "/src/components/ui_components/wrappers/Col.jsx";
import Button from "/src/components/ui_components/buttons//Button.jsx";
import { useState, useEffect } from 'react'
import { MOCKAPI_ENDPOINT } from "../../constants";
import TourCard from "../TourCard/TourCard";
import { IKContext } from 'imagekitio-react'

function Card(props) {
    function StarRating(props){
        const stars = new Array(5)

        for(let i = 0; i < 5; i++){
            if(props.rating >= i + 1) stars[i] = <img className={styles.icon} src="/assets/icons/star_filled.svg" alt="" key={i}/>
            else if (props.rating > i) stars[i] = <img className={styles.icon} src="/assets/icons/star_half.svg" alt="" key={i}/>
            else stars[i] = <img className={styles.icon} src="/assets/icons/star_empty.svg" alt="" key={i}/>
        }

        return stars
    }

    const $ = function(num){
      return {
          value(){return num},
          addCommas(){
              let numStr = num.toString()
              num = numStr.replaceAll(/(?<=\d)(?=(\d{3})+$)/g, ',')
              return this
              },
          addCurrency(){
              let numStr = num.toString()
              num = "$" + numStr
              return this            
          }
      }
  }

  return (
    // <div className="col py-8 px-0 px-xsm-4 px-lg-8">
      <div className={clsx(styles.card, "card border-0 h-100 gap-8")}>
        <div className="position-relative">
          <div className={clsx(styles.card__imgWrap)}>
            <img
              src={props.card_thumbnail}
              className="img-fluid"
              alt="..."
              style={{
                objectPosition:props.poi
              }}
            />
            
          </div>
          <div className={clsx(styles.card__flagWrp)}>
            <img
              src={props.card_flag}
              className="img-fluid"
              alt="..."
            />
          </div>
          
          <div className={clsx(styles.card__rating, 'd-md-none d-flex flex-row gap-1 justify-content-end w-100 mt-1')}>
                <StarRating rating={props.rating}/>
            </div>
        </div>
        <div className={clsx(styles.card__body, "card-body d-flex flex-column gap-1")}>
          <small className="text-muted d-flex justify-content-between flex-row">
            <span className="d-flex align-items-center gap-2">
              <img src="/assets/icons/calender.svg" alt="" className={styles.icon}/> {props.duration} Days
            </span>
            <span className="d-flex align-items-center gap-2">
              <img src="/assets/icons/avatar.svg" alt="" className={styles.icon}/> {$(props.count).addCommas().value()} Going
            </span>
          </small>
          <div className="d-flex flex-row justify-content-between">
            <h5 className={clsx(styles.card__title)}>
              <a
                href="https://unsplash.com/photos/aigrKLc6xc0"
                className="stretched-link text-black text-capitalize"
              >
                {props.city}
              </a>
            </h5>
            <div className={clsx(styles.card__rating, 'd-md-flex d-none flex-row justify-content-end gap-1')}>
                <StarRating rating={props.rating}/>
            </div>
          </div>
          <div>
            <small className="d-flex align-items-center gap-2 text-muted text-capitalize">
              <img src="/assets/icons/location.svg" alt="" className={styles.icon}/>
              {props.country}
            </small>
          </div>
          <div className="d-flex align-items-center gap-3 fw-medium my-3">
            <large className="text-primary lead fw-medium">{$(props.price_now).addCommas().addCurrency().value()}</large>
            <small className={clsx(styles.price_old)}>{$(props.price_old).addCommas().addCurrency().value()}</small>
          </div>
          <small className="card-text mb-auto text-wrap">
            {props.details}
          </small>
          {/* <button className="btn btn-primary mt-5">Explore Now</button> */}
          <Button mods={'mt-5'}>
            Explore Now
          </Button>
        </div>
      </div>
    // </div>
  );
}

function HoneymoonPkgSec() {
    // const fetchedCard = [
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-weggis_lake.png',
    //         card_flag:'/assets/images/descriptive/flag-tokyo.png',
    //         duration:45,
    //         count:'65,619',
    //         city:'Bern',
    //         rating:3,
    //         country:'Switzerland',
    //         price_now:'1,000',
    //         price_old:'1,200',
    //         details:'Omnis similique consequuntur. Commodi incidunt nihil et. Consectetur eum aut exercitationem nostrum nisi reprehenderit quaerat commodi non.',
    //     },
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-toucan.png',
    //         card_flag:'/assets/images/descriptive/flag-brazil.png',
    //         duration:14,
    //         count:'2,942',
    //         city:'Rio De Janerio',
    //         rating:3.5,
    //         country:'Brazil',
    //         price_now:'900',
    //         price_old:'1,000',
    //         details:'Possimus laboriosam minus tenetur voluptatem consequatur ab eligendi dolore veniam. Ut dolor dicta. Iure reiciendis praesentium. Omnis cumque corrupti earum. Occaecati beatae eos.',
    //     },
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-pharo.png',
    //         card_flag:'/assets/images/descriptive/flag-egypt.png',
    //         duration:34,
    //         count:'89,644',
    //         city:'Giza',
    //         rating:3,
    //         country:'Egypt',
    //         price_now:'700',
    //         price_old:'850 ',
    //         details:'Quis harum aspernatur quisquam cum. Eum quo nulla. Ut cum velit atque at laborum fuga veniam dolor. Voluptas nisi optio incidunt fuga illum voluptas sint quam sit. Dolorem nihil tenetur reiciendis ad ',
    //     },
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-chureito_pagoda.png',
    //         card_flag:'/assets/images/descriptive/flag-france.png',
    //         duration:14,
    //         count:'56,853',
    //         city:'Tokyo',
    //         rating:4.5,
    //         country:'Japan',
    //         price_now:'1,800',
    //         price_old:'2,500 ',
    //         details:'Et optio qui dolorem sed. Nesciunt dolores blanditiis officia. Optio quis temporibus nobis eum dolore dolorum quas quia est. Qui tenetur quibusdam.',
    //     },
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-riyadh_city.png',
    //         card_flag:'/assets/images/descriptive/flag-sauid_arabia.png',
    //         duration:5,
    //         count:'6,649',
    //         city:'Riyadh',
    //         rating:4,
    //         country:'Saudi Arabia',
    //         price_now:'1,000',
    //         price_old:'1,300 ',
    //         details:'Rerum voluptas commodi. Sint distinctio incidunt voluptatem sunt quia at tempore. Dolorem ut quia animi suscipit. Consequuntur magnam tempora aliquam illum sequi sed ut. Ea enim cumque.',
    //     },
    //     {
    //         card_thumbnail:'/assets/images/descriptive/card_image-effiel_tower.png',
    //         card_flag:'/assets/images/descriptive/flag-swizerland.png',
    //         duration:19,
    //         count:'40,122',
    //         city:'Paris',
    //         rating:3.5,
    //         country:'France',
    //         price_now:'1,550',
    //         price_old:'2,000 ',
    //         details:'Illum molestiae eos nihil culpa similique quaerat. Ipsa rem quam fuga sint consectetur doloremque. Repellendus aut molestiae. Placeat ut qui quisquam qui exercitationem perferendis saepe sapiente.',
    //     }
    // ]

    const ENDPOINT = "https://650fdec13ce5d181df5cb799.mockapi.io/v1/trendyPackages"
    const [fetchedData, setFetchedData] = useState([])

    function fetchData(){
      return fetch(MOCKAPI_ENDPOINT).then((response) => response.json()).then((data) => setFetchedData(data)).catch(() => [])
    }

    useEffect(function(){
      fetchData()
    }, [])
  
    // useEffect(function(){
    //   async function fetchData(){
    //     const response = await fetch(ENDPOINT, {
    //       method: 'GET',
    //     })
        
    //     return response
    //   }
      
    //   const response = JSON.parse(fetchData().then())
    //   setFetchedData(response)
    // }, [])




    const cardsDOM = fetchedData.map(
        function(cardData){
            return(
                <Col 
                    key={cardData.id}
                    mods={clsx(styles.cardWrp, 'col py-8 px-0 px-xsm-4 px-lg-8')}
                >
                    <TourCard cardData={cardData}/>
                </Col>
            )
        }
    )

  return (
    <Section id="packages">
      <Content>
        <Header
          title={"trendy"}
          subtitle={
            <>
              Our Trendy Tour
              <br /> Packages
            </>
          }
          mods={"text-center"}
        />
              <IKContext
        urlEndpoint="https://ik.imagekit.io/lgd9ykfw6/"
        publicKey="public_jYTemusiZpt+yCs8inkps77IdKo="
      >
                <Row mods={clsx("row-cols-1 row-cols-sm-2 row-cols-mid-3")}>
            {cardsDOM}
        </Row>
      </IKContext>
      </Content>
    </Section>
  );
}

export default HoneymoonPkgSec;
