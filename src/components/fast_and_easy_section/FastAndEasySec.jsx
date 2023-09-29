import styles from './fast_and_easy.module.css'
import clsx from 'clsx'
import Section from '/src/components/ui_components/wrappers/Section.jsx'
import Content from '/src/components/ui_components/wrappers/Content.jsx'
import ContentMin from '/src/components/ui_components/wrappers/ContentMin.jsx'
import Header from '/src/components/ui_components/headers/Header.jsx'
import Row from '/src/components/ui_components/wrappers/Row.jsx'
import Col from '/src/components/ui_components/wrappers/Col.jsx'

function FastAndEasySec() {
    return (
        <Section>
            <Row mods={'row gap-10 gap-md-0 justify-content-md-between justify-content-center'}>
                <Col mods={'col-md-6 col-12 text-md-start text-center'}>
                    <ContentMin breakpoint='md'>
                        <Header
                            title={"fast & easy"}
                            subtitle={<>Get Your Favourite<br className='d-none d-md-block' /> Resort Booking</>}
                            // min_content
                            mods={""}
                        />
                        <Content>
                            <div className="section-list d-flex flex-column gap-4">
                                <div className="section-list-item d-flex flex-column flex-md-row align-items-center  gap-4">
                                    <div className={clsx(styles.list_icon, styles.list_icon__1, "flex-shrink-0 rounded-4")}>
                                        <img src="/assets/icons/square.svg" alt="" className="img-fluid w-100" />
                                    </div>
                                    <div className="d-flex flex-column text-gray-1">
                                        <span className="list-item-title fw-bold">
                                            Choose Destination
                                        </span>
                                        <small className={clsx(styles.list_text)}>
                                            deleniti sint quia voluptatum quaerat optioqui distinctio sed
                                        </small>
                                    </div>
                                </div>

                                <div className="section-list-item d-flex flex-column flex-md-row align-items-center  gap-4">
                                    <div className={clsx(styles.list_icon, styles.list_icon__2, "flex-shrink-0 rounded-4")}>
                                        <img src="/assets/icons/swimming.svg" alt="" className="img-fluid w-100" />
                                    </div>
                                    <div className="d-flex flex-column text-gray-1">
                                        <span className="list-item-title fw-bold">
                                            Check Availability
                                        </span>
                                        <small className={clsx(styles.list_text)}>
                                            deleniti sint quia voluptatum quaerat optioqui distinctio sed
                                        </small>
                                    </div>
                                </div>

                                <div className="section-list-item d-flex flex-column flex-md-row align-items-center  gap-4">
                                    <div className={clsx(styles.list_icon, styles.list_icon__3, "flex-shrink-0 rounded-4")}>
                                        <img src="/assets/icons/taxi.svg" alt="" className="img-fluid w-100" />
                                    </div>
                                    <div className="d-flex flex-column text-gray-1">
                                        <span className="list-item-title fw-bold"> Let’s Go </span>
                                        <small className={clsx(styles.list_text)}>
                                            temporibus eaque quod eos autem expeditacum vel et
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </ContentMin>
                </Col>

                <Col mods={'col-6'}>
                    <Content mods={clsx(styles.content_img, 'position-relative d-sm-flex d-none justify-content-end')}>
                        <div className={clsx(styles.card_main, "d-flex flex-column position-relative p-4 gap-3 bg-white rounded-4 fw-medium")}>
                            <div className={clsx(styles.blueBlur)}></div>
                            <div className={clsx(styles.card_main_img)}>
                                <img src="/assets/images/decorative/card_img_beach.png" className="img-fluid rounded-4" alt="" />
                            </div>
                            <span className="fw-bold">Trip to Hawaii</span>
                            <span className="text-gray-2">14-29 June | by JR Martinax</span>
                            <div className="d-flex flex-row gap-3 my-3">
                                <div className={clsx(styles.leafImg, "img-fluid p-3 rounded-pill bg-light")}></div>
                                <div className={clsx(styles.leafImg, "img-fluid p-3 rounded-pill bg-light")}></div>
                                <div className={clsx(styles.leafImg, "img-fluid p-3 rounded-pill bg-light")}></div>
                            </div>

                            <div className="d-flex flex-row gap-4 align-items-center">
                                <img src="/assets/icons/building.svg" alt="" />
                                <span className="text-gray-2 flex-grow-1">60 people are interested</span>
                                <img src="/assets/icons/heart_outline.svg" alt="" />
                            </div>
                            <div className={clsx(styles.card_secondary, "position-absolute d-flex flex-row gap-3 p-4 shadow rounded-4 bg-white fw-medium")}>
                                <div className={clsx(styles.card_secondary_img, "rounded-pill flex-shrink-0")}>
                                </div>

                                <div className="d-flex flex-column w-100">
                                    <small className="text-gray-2 fw-medium">Ongoing</small>
                                    <span>Trip to Rome</span>
                                    <span className="my-1"><span className="text-primary">40%</span> completed</span>
                                    <div className="bg-light w-100 rounded-pill overflow-hidden">
                                        <div className="bg-primary w-50 py-1"></div>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(styles.plusGrid)}>
                                <img src="/assets/images/decorative/plus_grid.png" alt="" className="img-fluid" />
                            </div>
                        </div>


                        <div className={clsx(styles.planeImg)}>
                            <img src="/assets/images/decorative/airplane.png" alt="" className="img-fluid" />
                        </div>
                    </Content>
                </Col>
            </Row>
        </Section>
    )
}

export default FastAndEasySec