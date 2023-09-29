import styles from './sponsors.module.css'

function Sponsor(props) {
    return (
        <div className="d-flex col-5 col-lg justify-content-center align-items-center">
            <img src={props.src} alt={props.alt} className="img-fluid" />
        </div>
    )
}

function Sponsors() {
    return (
        <section className={styles.sponsors}>
            <div className="container-fluid px-5 py-10 px-xl-10">
                <div className="row justify-content-around g-0 gx-8 gap-10 gap-lg-0">
                    <Sponsor src="/assets/images/descriptive/sponsor-fly_emirates.png"
                        alt="Fly Emirates Logo"
                    />
                    <Sponsor src="/assets/images/descriptive/sponsor-trivago.png"
                        alt="Trivago Logo"
                    />
                    <Sponsor src="/assets/images/descriptive/sponsor-airbnb.png"
                        alt="airbnb Logo"
                    />
                    <Sponsor src="/assets/images/descriptive/sponsor-turkish_airlines.png"
                        alt="Turkish Airlines Logo"
                    />
                    <Sponsor src="/assets/images/descriptive/sponsor-swiss.png"
                        alt="Swiss Airlines Logo"
                    />
                </div>
            </div>
        </section>
    )
}

export default Sponsors