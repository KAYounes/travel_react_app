import styles from './wrappers.module.css'
import clsx from 'clsx'

function SectionHero(props) {
    return (
        <section className={clsx(styles.section__hero)}>
            <div className={clsx(styles.section__hero__cnt, 'container-xxl', 'p-0')}>
                {props.children}
            </div>
        </section>
    )
}

export default SectionHero