import { Link } from 'react-router-dom'
import styles from './button.module.css'
import clsx from 'clsx'

function Button(props){
    return(
        <Link className={clsx(styles.btn, props.mods, 'btn btn-primary')} to={props.to}>
            {props.value}
            {props.children}
        </Link>
    )
}

export default Button