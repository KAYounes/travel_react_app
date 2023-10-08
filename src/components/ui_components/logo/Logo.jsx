import styles from './logo.module.css'
import clsx from 'clsx';

function Logo(props) {
    return (
        <a href="#" className={clsx(styles.logo, props.dark && styles.logo_dark, props.brand && 'navbar-brand', props.mods)}>
            
                Travel
                <img 
                    src="/assets/images/decorative/logo_arrow.png" 
                    alt=""
                    className={`${styles.logo__arrow} img-fluid`} 
                />
        </a>
    )
}

export default Logo;