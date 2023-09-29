import styles from './arched_img.module.css'
import clsx from 'clsx'

function ArchedImg(props) {
    return (
        <div className={clsx(styles.archedImg__wrp, props.wrp_mods)}>
            <div className={clsx(styles.archedImg__img, props.img_mods)}>
                <span className={clsx(styles.archedImg_txt, props.txt_mods, "text-gray-4 display-5 fw-bold")}>
                    {props.txt}
                </span>
                {props.children}
            </div>
        </div>
    )
}

export default ArchedImg