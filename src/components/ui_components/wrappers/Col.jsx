// import styles from './wrappers.module.css'
import PropTypes from 'prop-types'
import clsx from 'clsx'

function Col(props){
    return(
        <div className={clsx(props.mods)}>
            {props.children}
        </div>
    )
}

Col.propTypes = {
    mods: PropTypes.string,
    children: PropTypes.node
}

export default Col