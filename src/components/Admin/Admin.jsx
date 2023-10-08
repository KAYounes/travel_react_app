import styles from './styles.module.css'
//
import AdminNavbar from '../AdminNavbar'
import AdminDashboard from '../AdminDashboard'
import Section from '../ui_components/wrappers/Section.jsx'
import SectionFluid from '../ui_components/wrappers/SectionFluid.jsx'
import Content from '../ui_components/wrappers/Content.jsx'
import Row from '../ui_components/wrappers/Row.jsx'
import Col from '../ui_components/wrappers/Col.jsx'
import Logo from '../ui_components/logo/Logo.jsx'
import Button from '../ui_components/buttons/Button.jsx'



export default function Admin()
{
    return(
        <>
            <AdminNavbar backButtonText='Back Home' subTitle='Admin' showLogo/>
            <AdminDashboard/>
        </>
    )
}
