import styles from './ad_hero_section.module.css'
import clsx from 'clsx'
import SectionHero from '/src/components/ui_components/wrappers/SectionHero.jsx'
import Content from '/src/components/ui_components/wrappers/Content.jsx'

function FastAndEasySec() {
    return (
        <SectionHero>
            <Content mods={clsx(styles.hero, 'h1', 'text-white', 'd-flex', 'flex-column', 'justify-content-center')}>
                <div className={clsx(styles.hero__txt)}>Let&apos;s Make Your</div>
                <div className={clsx(styles.hero__txt)}>
                    Next Holiday <span className={clsx(styles.hero__txt_scribbled)}>
                        Amazing
                        <img src="src/assets/images/decorative/scribble_1.svg" alt="" />
                    </span>
                </div>
            </Content>
        </SectionHero>
    )
}

export default FastAndEasySec