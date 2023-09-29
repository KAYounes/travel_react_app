import styles from './button.module.css'
import clsx from 'clsx'

function Button(props){
    return(
        <button className={clsx(styles.btn, props.mods, 'btn btn-primary')}>
            {props.value}
            {props.children}
        </button>
    )
}

export default Button