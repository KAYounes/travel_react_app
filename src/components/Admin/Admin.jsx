import styles from './styles.module.css'
//
import AdminNavbar from '../AdminNavbar'
import AdminDashboard from '../AdminDashboard'
//

export default function Admin()
{
    return(
        <>
            <AdminNavbar goseTo='/' backButtonText='Back Home' subTitle='Admin' showLogo/>
            <AdminDashboard/>
        </>
    )
}
