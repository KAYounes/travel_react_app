import React from 'react';
import styles from './styles.module.css'
import Button from '../ui_components/buttons/Button';
import { FLAGS_API } from '../../constants';
import {IKImage} from 'imagekitio-react'
import {useParams, useLocation} from 'react-router-dom'
//
import clsx from 'clsx';

export default function TourCardPlaceholder(props) 
{
  return (  
          <div className={clsx(styles.card, "card border-0 h-100 gap-8")}>
            <div className="position-relative">
              <div className={clsx(styles.card__imgWrap)}>
                {/* thumbnail */}
                <div className='placeholder col-12 h-100'>
                        <div className="placeholder w-100 h-100"></div>
                </div>
              </div>
              <div className={clsx(styles.card__flagWrp)}>
                {/* flag */}
              </div>
              
              <div className={clsx(styles.card__rating, 'd-md-none d-flex flex-row gap-1 justify-content-end w-100 mt-1')}>
                    {/* rating */}
                </div>
            </div>
            <div className={clsx(styles.card__body, "card-body d-flex flex-column gap-1")}>
              <small className="row justify-content-between">
                  {/* duration */}
                  <div className='placeholder col-12'>
                        <div className="placeholder w-100">
                        </div>
                    </div>
                    
                  {/* popularity */}
                  <div className='placeholder col-3'>
                        <div className="placeholder placeholder w-100">
                        </div>
                    </div>
              </small>
              <div className="row justify-content-between">
                    {/* {city} */}
                    <div className='placeholder col-6'>
                        <div className="placeholder placeholder-lg w-100">
                        </div>
                    </div>
                <div className={clsx(styles.card__rating, 'col-4')}>
                    {/* Rating */}
                    <div className='placeholder'>
                        <div className="placeholder placeholder-lg bg-warning w-100"></div>
                    </div>
                </div>
              </div>
              <div>
                <small className="row">
                  {/* {country} */}
                  <div className='placeholder col-3'>
                        <div className="placeholder placeholder w-100">
                        </div>
                    </div>
                </small>
              </div>
              <div className="d-flex align-items-center gap-3 fw-medium my-3">
                {/* Price */}
                <div className='placeholder placeholder-wave col-3'>
                        <span className="placeholder w-100"></span>
                </div>
                <div className='placeholder col-3'>
                        <div className="placeholder w-100"></div>
                </div>
              </div>
              <small className="card-text h-100">
                {/* {details} */}
                <div className='placeholder col-12 h-100'>
                        <div className="placeholder placeholder w-100" style={{}}></div>
                        <div className="placeholder placeholder w-100" style={{}}></div>
                        <div className="placeholder placeholder w-100" style={{}}></div>
                </div>
              </small>
              <Button mods={'mt-5 p-5'}>
                
              </Button>
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
