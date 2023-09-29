import styles from "./testimonials_section.module.css";
import clsx from "clsx";
import SectionFluid from "/src/components/ui_components/wrappers/SectionFluid.jsx";
import Content from "/src/components/ui_components/wrappers/Content.jsx";
import Header from "/src/components/ui_components/headers/Header.jsx";

export default function TestimonialsSec() {
    const testimonialsData=[
        {
            interval: 2500,
            profilePic: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/680.jpg",
            review: 'Ab tempora dolor voluptas esse aperiam tempora voluptatem nulla aut. In natus enim ut velit. Iusto sequi excepturi nihil ut et hic consequatur ratione.',
            name: 'Robin Gerlach',
            occupation: 'Direct Quality Producer',
            active: true
        },
        {
            interval: 2500,
            profilePic: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/45.jpg",
            review: 'Why am I even here I never used your services?!?!?',
            name: 'Elta Harris',
            occupation: 'Eats at Macdonalds',
        },
        {
            interval: 2500,
            profilePic: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/41.jpg",
            review: 'I do not know why did I choose the Egypt tour when I already live in Egypt. Can I get my $850',
            name: 'Thora Bins',
            occupation: 'Owns a Fava Beans Cart',
        },
    ]

    const testimonialsDOM = testimonialsData.map(
        function(el, indx){
            return(
                <CarouselItem
                key={indx}
                interval={el.interval}
                profilePic={el.profilePic}
                review={el.review}
                name={el.name}
                occupation={el.occupation}
                active={el?.active}
            />
            )
        }
    )
    
    return (
        <SectionFluid>
            <Content mods={clsx(styles.main, 'pb-10')}>
                <div className="w-100 opacity-25" style={{aspectRatio:'1/0.1', minHeight:'100px'}}></div>
                <Content>
                    <Header
                        title={"Testimonials"}
                        subtitle={<>Our Trendy Tour<br /> Packages</>}
                        mods={'text-center'}
                    />
                </Content>
                <Content>
                    <div id="testimonials-carousel" className={clsx(styles.carouselWrp, "carousel slide d-flex flex-column")} data-bs-ride="carousel">
                        <div className={clsx("d-flex flex-row justify-content-center")}>
                            <button className={clsx(styles.controls__btn, styles.controls__btn_prev, "carousel-control carousel-control-prev d-none d-md-block")} type="button"
                                data-bs-target="#testimonials-carousel" data-bs-slide="prev">
                                <span className={clsx(styles.controls__btn__icon, styles.controls__btn__icon_prev, "carousel-control-icon carousel-control-prev-icon")} aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <div className={clsx(styles.carousel__inner, "carousel-inner py-10 gap-5")}>
                                {testimonialsDOM}
                            </div>
                            <button className={clsx(styles.controls__btn, styles.controls__btn_next, "carousel-control carousel-control-next d-none d-md-block")} type="button"
                                data-bs-target="#testimonials-carousel" data-bs-slide="next">
                                <span className={clsx(styles.controls__btn__icon, styles.controls__btn__icon_next, "carousel-control-icon carousel-control-next-icon")} aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className={clsx(styles.carousel__tabs, 'carousel-indicators gap-2')}>
                            <div className={clsx(styles.carousel__tabWrp)}>
                                <button className={clsx(styles.carousel__tab, "active")} type="button" data-bs-target="#testimonials-carousel" data-bs-slide-to="0"
                                    aria-current="true" aria-label="Slide 1"></button>
                            </div>
                            <div className={clsx(styles.carousel__tabWrp)}>
                                <button className={clsx(styles.carousel__tab)} type="button" data-bs-target="#testimonials-carousel" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            </div>
                            <div className={clsx(styles.carousel__tabWrp)}>
                                <button className={clsx(styles.carousel__tab)} type="button" data-bs-target="#testimonials-carousel" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                        </div>
                    </div>
                </Content>
            </Content>
        </SectionFluid>
    )
}

function CarouselItem(props){
    return(
        <div className={clsx(styles.carousel__item, "carousel-item px-3", props.active && 'active')} data-bs-interval={props.interval}>
        <div className={clsx(styles.reviewWrp, "mx-auto")}>
            <div
                className={clsx(styles.review__card, "mx-auto bg-white rounded-4 shadow-sm d-flex flex-column justify-content-between align-items-center p-8 px-4 px-md-10 gap-8 text-center")}>
                <div className={clsx(styles.review__imgWrp)}>
                    <img
                        src={props.profilePic}
                        alt=""/>
                </div>
                <div className={clsx(styles.review__txt, "mt-8 text-truncate d-inline text-wrap")}>
                    {props.review}
                </div>
                <div className={clsx(styles.review__details)}>
                    <strong>{props.name} &#8212; {props.occupation}</strong>
                </div>
            </div>
        </div>
    </div>
    )
}