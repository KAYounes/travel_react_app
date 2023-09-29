import clsx from 'clsx'
import styles from './wrappers.module.css'

function Content(props){
    return(
        <div className={clsx(styles.content, props.mods)}>
            {props.children}
        </div>
    )
}

export default Content