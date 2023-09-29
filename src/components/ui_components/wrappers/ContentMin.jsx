import clsx from 'clsx'
import styles from './wrappers.module.css'

function ContentMin(props){
    let breakpoint = ''
    switch(props.breakpoint){
        case('xsm'): 
        breakpoint = styles.content__minContent_xsm
        break

        case('msm'): 
        breakpoint = styles.content__minContent_msm
        break

        case('sm'): 
        breakpoint = styles.content__minContent_sm
        break

        case('md'): 
        breakpoint = styles.content__minContent_md
        break

        case('mid'): 
        breakpoint = styles.content__minContent_mid
        break

        case('lg'): 
        breakpoint = styles.content__minContent_lg
        break

        case('xl'): 
        breakpoint = styles.content__minContent_xl
        break

        case('xxl'): 
        breakpoint = styles.content__minContent_xxl
        break
    }

    return(
        <div className={clsx(styles.content, styles.content__minContent, props.mods, breakpoint)}>
            {props.children}
        </div>
    )
}

export default ContentMin