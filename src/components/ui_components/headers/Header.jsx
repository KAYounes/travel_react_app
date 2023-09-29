import styles from './header.module.css'
import PropTypes from 'prop-types'
import clsx from 'clsx'

function Header(props){

    return(
        <div className={clsx(
            styles.section__header,
            props.mods
        )}>
            <p className={clsx(styles.title, props.title_mods)}>
                {props.title}
            </p>
            <h1 className={clsx(styles.subtitle, props.subtitle_mods)}>
                {props.subtitle}
            </h1>
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Header