import styles from './logo.module.css'
import clsx from 'clsx';

function Logo(props) {
    let cls = `${styles.logo} ${props.darkLogo ? 'logoDark' : ''} ${props.brand ? 'navbar-brand' : null}`;
    // cls = cls.replace(/\s\s+/g, ' ').trim()

    return (
        <a href="#" className={clsx(styles.logo, props.dark && styles.logo_dark, props.brand && 'navbar-brand', props.mods)}>
                Travel
                <img 
                    src="src/assets/images/decorative/logo_arrow.png" 
                    alt=""
                    className={`${styles.logo__arrow} img-fluid`} 
                />
        </a>
    )
}

export default Logo;