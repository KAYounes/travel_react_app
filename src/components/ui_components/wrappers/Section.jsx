import styles from './wrappers.module.css'
import clsx from 'clsx'

function Section(props) {
    return (
        <section className={clsx(styles.section, props.mods)} id={props.id}>
            <div className={clsx(styles.section__cnt, 'container-mid px-3 px-mid-0')}>
                {props.children}
            </div>
        </section>
    )
}

export default Section