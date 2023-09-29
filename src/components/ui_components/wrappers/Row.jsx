import styles from './wrappers.module.css'
import clsx from 'clsx'

function Row(props){
    return(
        <div className={clsx('container-fluid p-0')}>
            <div className={clsx(props.row, props.mods, 'row', 'g-0')}>
                {props.children}
            </div>
        </div>
    )
}

export default Row