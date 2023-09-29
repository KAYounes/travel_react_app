import styles from './explore_section.module.css'
import clsx from 'clsx'
import SectionHero from '/src/components/ui_components/wrappers/SectionHero.jsx'
import Content from '/src/components/ui_components/wrappers/Content.jsx'
import Row from '/src/components/ui_components/wrappers/Row.jsx'
import Col from '/src/components/ui_components/wrappers/Col.jsx'
import Header from '/src/components/ui_components/headers/Header.jsx'

function ExploreSection() {
    return (
        <SectionHero>
            <Row mods={clsx(styles.hero)}>
                <Col mods={clsx(styles.hero__wrp, 'col-12 col-md-6', 'd-flex flex-column justify-content-center align-items-center text-center')}>
                    <Content mods={clsx(styles.hero__img, 'text-white', 'd-flex flex-column justify-content-center align-items-center gap-8')}>
                        <Header 
                            title={'promotion'}
                            subtitle={'Explore Nature'}
                            mods={clsx(styles.hero__title, 'text-center')}
                            title_mods={clsx('text-white')}
                            subtitle_mods={clsx('text-white')}
                        />
                        <button className={clsx(styles.cta, 'btn btn-outline-light')}>
                            View Packages
                        </button>
                    </Content>
                </Col>
                
                <Col mods={clsx(styles.hero__wrp, 'col-12 col-md-6', 'd-flex flex-column justify-content-center align-items-center text-center')}>
                    <Content mods={clsx(styles.hero__img, 'text-white', 'd-flex flex-column justify-content-center align-items-center gap-8')}>
                        <Header 
                            title={'promotion'}
                            subtitle={'Explore Cities'}
                            mods={clsx(styles.hero__title, 'text-center')}
                            title_mods={clsx('text-white')}
                            subtitle_mods={clsx('text-white')}
                        />
                        <button className={clsx(styles.cta, 'btn btn-outline-light')}>
                            View Packages
                        </button>
                    </Content>
                </Col>
            </Row>



{/* 
            <Content mods={clsx(styles.hero, 'h1', 'text-white', 'd-flex', 'flex-column', 'justify-content-center')}>
                <div className={clsx(styles.hero__txt)}>Let&apos;s Make Your</div>
                <div className={clsx(styles.hero__txt)}>
                    Next Holiday <span className={clsx(styles.hero__txt_scribbled)}>
                        Amazing
                        <img src="src/assets/images/decorative/scribble_1.svg" alt="" />
                    </span>
                </div>
            </Content>
 */}
        </SectionHero>
    )
}

export default ExploreSection