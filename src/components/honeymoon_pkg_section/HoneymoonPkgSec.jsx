import styles from './honeymoon_pkg_section.module.css'
import clsx from 'clsx'
import Section from '/src/components/ui_components/wrappers/Section.jsx'
import Content from '/src/components/ui_components/wrappers/Content.jsx'
import ContentMin from '/src/components/ui_components/wrappers/ContentMin.jsx'
import Header from '/src/components/ui_components/headers/Header.jsx'
import ArchedImg from '/src/components/ui_components/arched_image/ArchedImg.jsx'
import Row from '/src/components/ui_components/wrappers/Row.jsx'
import Col from '/src/components/ui_components/wrappers/Col.jsx'
import Button from '/src/components/ui_components/buttons//Button.jsx'

function HoneymoonPkgSec() {
    return (
        <Section>
            <Row mods={"align-items-center justify-content-md-around justify-content-center gap-10 gap-md-0"}>
                <Col mods={"d-flex flex-row justify-content-center align-items-center col-12 col-md-6"}>
                    <Content mods={""}>
                        <ArchedImg 
                            wrp_mods={clsx(styles.archedImg__wrp_honeymoon)} 
                            img_mods={clsx(styles.archedImg__img_honeymoon)}
                            txt_mods={styles.archedImg_txt__honeymoon}
                            txt={"Honeymoon Packages"}
                            >
                            <div className={styles.archedImg_bubbleImg}></div>
                            <div className={styles.archedImg_bubbleImg}></div>
                            <div className={styles.archedImg_bubbleImg}></div>
                            <div className={clsx(styles.plusGrid)}>
                                <img src="/assets/images/decorative/plus_grid.png" alt="" className="img-fluid" />
                            </div>
                        </ArchedImg>
                    </Content>
                </Col>

                <Col mods={"col-12 col-md-6 d-flex justify-content-center justify-content-md-end"}>
                    <ContentMin mods={"text-center text-md-start"} breakpoint=''>
                        <Header
                            title={"honeymoon specials"}
                            subtitle={<>Our Romantic Tropical<br /> Destinations</>}
                            min_content
                            mods={""}
                        />
                        <Content>
                            <p>
                                Et labore harum non nobis ipsum eum molestias mollitia et corporis
                                praesentium a laudantium internos. Non quis eius quo eligendi
                                corrupti et fugiat nulla qui soluta recusandae in maxime quasi aut
                                ducimus illum aut optio quibusdam!
                            </p>
                            {/* <button className="btn btn-primary w-100">View Packages</button> */}
                            <Button value={"View Packages"} mods={"w-100"}/>
                        </Content>
                    </ContentMin>
                </Col>
            </Row>
        </Section>
    )
}

export default HoneymoonPkgSec