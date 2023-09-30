import React from 'react';
import styles from 'styles.module.css'
//
import clsx from 'clsx';

export default function TourCard({
    ThumbnailSrc,
    countryFlagSrc,
    duration,
    popularity,
    city,
    rating,
    country,
    priceNow,
    priceBefore,
    description,
    poi,
    id,
}) 
{
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
                {props.description}
              </small>
              <Button value={'Explore Now'} mods={'mt-5'} />
            </div>
          </div>
  )
}

function StarRating({ rating }){
    const stars = new Array(5)

    for(let i = 0; i < 5; i++){
        if(rating >= i + 1) stars[i] = <img className={styles.icon} src="/assets/icons/star_filled.svg" alt="" key={i}/>
        else if (rating > i) stars[i] = <img className={styles.icon} src="/assets/icons/star_half.svg" alt="" key={i}/>
        else stars[i] = <img className={styles.icon} src="/assets/icons/star_empty.svg" alt="" key={i}/>
    }

    return stars
}
