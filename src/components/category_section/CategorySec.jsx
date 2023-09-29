import styles from './category_section.module.css'
import Section from '/src/components/ui_components/wrappers/Section.jsx'
import Content from '/src/components/ui_components/wrappers/Content.jsx'
import Header from '/src/components/ui_components/headers/Header.jsx'
import clsx from 'clsx'

function ServiceCard(props) {
    return (
        <div className={clsx(styles.service_card__wrapper, "col-12 col-xsm-9 col-sm-4 col-lg")}>
            <div className={clsx(styles.service_card, "h-100 d-flex flex-column align-items-center rounded-4 p-5 gap-5")}>
                <div className={clsx(styles.service_card__hover)}></div>

                <div className="service-card-thumbnail-wrapper position-relative w-25">
                    <div className={clsx(styles.service_card__img_bg)}></div>
                    <img 
                        src={props.img} alt={props.alt}
                        className={clsx(styles.service_card__img, "img-fluid position-relative")}
                    />
                </div>

                <div className="d-flex flex-column align-items-center text-center">
                    <p className={clsx(styles.service_card__title, "fw-semibold fs-18 mb-3")}>
                        {props.title}
                    </p>
                    <small className={clsx(styles.service_card__txt, "text-gray")}>
                        {props.text}
                    </small>
                </div>
            </div>
        </div>
    )
}

function CategorySec() {
    return (
        <Section>
            <Header title="Category" subtitle="We Offer Best Services" mods="text-center"/>

            <Content>
                <div className={clsx("justify-content-center row g-0 p-8 p-lg-0 gap-5 gap-mid-3")}>
                    <ServiceCard 
                        img={'/assets/images/decorative/service_img_01.png'} 
                        title={<>Guided<br /> Tour</>} 
                        text={"Dolor excepturi facilis molestiae odit dolorem et magnam eos sed."}
                    />
                    <ServiceCard 
                        img={'/assets/images/decorative/service_img_02.png'} 
                        title={<>Best Flights<br/> Options</>} 
                        text={"Qui cum distinctio tempore repudiandae ut earum error molestiae et."}
                    />
                    <ServiceCard 
                        img={'/assets/images/decorative/service_img_03.png'} 
                        title={<>Religious<br />Tours</>} 
                        text={"Inventore cum veniam vel eos iste alias earum."}
                    />
                    <ServiceCard 
                        img={'/assets/images/decorative/service_img_04.png'} 
                        title={<>Medical<br/> Insurance</>} 
                        text={"Libero accusantium repudiandae nulla."}
                    />
                </div>
            </Content>
        </Section>
    )
}

export default CategorySec