import styles from './header.module.css'
import Button from '/src/components/ui_components/buttons/Button.jsx'

function Header() {
    return (
        <header className={`${styles.header} px-2 px-sm-5 px-xl-0`}>
            <div className="container-xl pt-10">
                <div className="display-3 mb-5 pt-10">
                    <img src="/assets/images/decorative/zigzag.svg" alt="" className={`${styles.title__decoration} img-fluid`}/>
                    <p className={styles.title}>
                        No matter where <br className="d-none d-sm-block" />
                        you’re going to, we’ll <br className="d-none d-sm-block" />
                        take you there
                    </p>
                </div>

                <div className="container-fluid">
                    <div className="row g-0">
                        <div className="col-12 col-mid-11 col-lg-9">
                            <form className={`${styles.header__form} row g-0 rounded-3 p-3 gap-4 gap-mid-0`}>
                                <div className="col-12 col-mid">
                                    <input type="text" className="form-control" placeholder="Where to?" />
                                </div>

                                <hr className="vr rounded-pill bg-light mx-2 col-auto my-2 d-none d-mid-block"></hr>

                                <div className="col-12 col-mid">
                                    <select className="form-select" name="travel_type" defaultValue={"placeholder"}>
                                        <option value="placeholder" disabled="disabled" hidden="hidden">
                                            Travel Type
                                        </option>
                                        <option value="flight">Flight</option>
                                        <option value="car">Car</option>
                                        <option value="bus">Bus</option>
                                        <option value="train">Train</option>
                                        <option value="cruise">Cruise</option>
                                        <option value="bicycle">Bicycle</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="hiking">Hiking</option>
                                        <option value="boat">Boat</option>
                                        <option value="rv">RV</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <hr className="vr rounded-pill bg-light mx-2 col-auto my-2 d-none d-mid-block"></hr>

                                <div className="col-12 col-mid">
                                    <select className="form-select" name="duration" defaultValue={"placeholder"}>
                                        <option value="placeholder" disabled="disabled" hidden="hidden" >
                                            Duration
                                        </option>
                                        <option value="one_day">One day</option>
                                        <option value="weekend">Weekend</option>
                                        <option value="week">Week</option>
                                        <option value="two_weeks">Two weeks</option>
                                        <option value="month">Month</option>
                                        <option value="longer">Longer</option>
                                    </select>
                                </div>

                                {/* <button className="btn btn-primary col">Submit</button> */}
                                <Button mods={'col'}>
                                    Get In Touch
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-3 d-flex align-items-mid-center flex-column flex-mid-row px-3 gap-2">
                        <div className="d-flex lex-shrink-0">
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_1.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_2.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_3.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_4.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_5.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_6.png" alt="" />
                            <img className={styles.profileImage} src="/assets/images/decorative/profile_6.png" alt="" />
                            <span className={styles.profileAdd}>+</span>
                        </div>
                        <span className="text-light text-center text-xsm-start">2,500 people booked Tommorowland Event in last 24 hours</span>
                    </div>
                </div>

                <div className={styles.scrollIndicator}>
                    <span><span>scroll</span></span>
                </div>
            </div>
        </header>
    )
}

export default Header