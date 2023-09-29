import styles from "./promotion_section.module.css";
import clsx from "clsx";
import Section from "/src/components/ui_components/wrappers/Section.jsx";
import Content from "/src/components/ui_components/wrappers/Content.jsx";
import ContentMin from "/src/components/ui_components/wrappers/ContentMin.jsx";
import Header from "/src/components/ui_components/headers/Header.jsx";
import ArchedImg from "/src/components/ui_components/arched_image/ArchedImg.jsx";
import Row from "/src/components/ui_components/wrappers/Row.jsx";
import Col from "/src/components/ui_components/wrappers/Col.jsx";
import Button from "/src/components/ui_components/buttons/Button.jsx";

function PromotionCard(props) {
    return (
        <Col mods={clsx(styles.promotion__card, "rounded-3 overflow-hidden")}>
            <small className={clsx(styles.card__cost, "m-2 p-1 px-4 rounded-pill text-white fw-light bg-pr")}>
                {props.cost}
            </small>
            <img src={`/assets/images/descriptive/${props.imgSrc}`} alt="" className="img-fluid" />
        </Col>
    )
}

function PromotionSec() {
    const fetchPromotionCards = [
        { imgSrc: 'promotion_img-deventer.png', cost: '$700' },
        { imgSrc: 'promotion_img-berlin_cathedral.png', cost: '$800' },
        { imgSrc: 'promotion_img-big_ben.png', cost: '$500' },
        { imgSrc: 'promotion_img-colosseum.png', cost: '$400' },
    ]

    const cardElms = fetchPromotionCards.map(function (el, index) {
        return <PromotionCard key={index} cost={el.cost} imgSrc={el.imgSrc} />
    })

    return (
        <Section>
            <Content mods={'position-relative'}>
                <ContentMin breakpoint={'sm'} mods={'text-md-start text-center mx-auto mx-md-0 mb-10'}>
                    <Header
                        title={"promotion"}
                        subtitle={
                            <>
                                We Provide You Best
                                <br className="" /> Europe Sightseeing Tours
                            </>
                        }
                    />
                    <Content>
                        <p>
                            Et labore harum non nobis ipsum eum molestias mollitia et corporis
                            praesentium a laudantium internos. Non quis eius quo eligendi
                            corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
                            ducimus illum aut optio quibusdam!
                        </p>
                        <Button value={"View Packages"} mods={"w-100"} />
                    </Content>

                </ContentMin>

                <Content>
                    <Row mods={"d-flex flex-row row-cols-md-6 row-cols-sm-3 row-cols-1 gap-md-5 gap-8 justify-content-md-start justify-content-center"}>
                        {cardElms}
                    </Row>
                </Content>

                <Content mods={clsx(styles.content__img, 'justify-content-end d-md-flex d-none')}>
                    <ArchedImg
                        wrp_mods={clsx(styles.archedImg__wrp_honeymoon)}
                        img_mods={clsx(styles.archedImg__img_honeymoon)}
                        txt_mods={styles.archedImg_txt__honeymoon}
                        txt={"Breath Taking Views"}
                    />
                </Content>
            </Content>
        </Section>
    );
}

export default PromotionSec;
