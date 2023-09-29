import styles from "./footer.module.css";
import Section from "/src/components/ui_components/wrappers/Section.jsx";
import Content from "/src/components/ui_components/wrappers/Content.jsx";
import Button from "/src/components/ui_components/buttons/Button.jsx";
import Logo from "/src/components/ui_components/logo/Logo.jsx";

export default function Footer() {
    return (
        <Section>
            <Content mods={styles.main}>
                <Content>
                    <div className="row d-flex justify-content-between">
                        <div className="col-socials d-flex flex-column gap-3 col-12 col-msm-5 col-mid-3 mb-5 mb-msm-0">
                            <div className="item">
                                <h2 className="h2">
                                    <Logo dark />
                                </h2>
                            </div>
                            <div className="item">
                                <small className="fw-medium text-muted text-gray-100">
                                    Travel helps companies manage payments easily.
                                </small>
                            </div>
                            <div className="item d-noe d-msm-block">
                                <div className="social-links d-flex align-items-center justify-content-center justify-content-xsm-start gap-3">
                                    <img src="/assets/icons/linkedin.svg" alt="" />
                                    <img src="/assets/icons/messenger.svg" alt="" />
                                    <img src="/assets/icons/twitter.svg" alt="" />
                                    <img src="/assets/icons/twoo.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-company d-flex flex-column gap-5 col-6 col-msm-3 col-mid-2">
                            <div className="item col-header fw-semibold">Company</div>
                            <div className="item">
                                <a href="">About Us</a>
                            </div>
                            <div className="item">
                                <a href="">Careers</a>
                            </div>
                            <div className="item">
                                <a href="">Blog</a>
                            </div>
                            <div className="item">
                                <a href="">Pricing</a>
                            </div>
                        </div>
                        <div className="col-destinations d-flex flex-column gap-5 col-6 col-msm-3 col-mid-2">
                            <div className="item col-header fw-semibold">Destinations</div>
                            <div className="item">
                                <a href="">Maldives</a>
                            </div>
                            <div className="item">
                                <a href="">Los Angelas</a>
                            </div>
                            <div className="item">
                                <a href="">Las Vegas</a>
                            </div>
                            <div className="item">
                                <a href="">Torronto</a>
                            </div>
                        </div>
                        <div className="col-newsletter col d-flex flex-column mt-7 m-mid-0">
                            <div className="item col-header fw-semibold mb-5">
                                Join Our Newsletter
                            </div>
                            <div className="item">
                                <form
                                    action=""
                                    className="d-flex flex-column flex-lg-row align-items-stretch align-items-start gap-3 mb-5"
                                >
                                    <label htmlFor="email" className="visually-hidden">
                                        email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control py-3"
                                        id="email"
                                        placeholder="Email"
                                    />
                                    <Button>
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                            <div className="item">
                                <small className="text-muted">
                                    * Will send you weekly updates for your better tour packages.
                                </small>
                            </div>
                        </div>
                    </div>
                </Content>

                <hr className="my-8"/>

                <Content>
                    <div className="copywrite-cnt text-center">
                        <p>Copyright @ Xpro 2022. All Rights Reserved.</p>
                    </div>
                </Content>
            </Content>
        </Section>
    );
}
