import styles from './wrappers.module.css'
import clsx from 'clsx'

function SectionFluid(props) {
    return (
        <section className={clsx(styles.section__fluid)}>
            <div className={clsx(styles.section__fluid__cnt, 'container-fluid', 'p-0')}>
                {props.children}
            </div>
        </section>
    )
}

export default SectionFluid