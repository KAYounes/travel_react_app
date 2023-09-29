import styles from './navbar.module.css'
import Logo from '/src/components/ui_components/logo/Logo.jsx'
import Button from '/src/components/ui_components/buttons/Button.jsx'
import NavbarNavItem from './NavbarNavItem.jsx'
import clsx from 'clsx'

function Navbar(props) {
    return (
        <nav
            className={`${styles.navbar} navbar navbar-collapse navbar-expand-mid navbar-light position-absolute top-0 start-0 end-0 mt-0 mt-mid-8 px-2 px-sm-5 px-xl-0 py-5 py-mid-0`}>
            <div className="container-xl">
                <Logo brand={true} />

                <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mx-mid-auto gap-4 py-4 p-mid-0">
                        <NavbarNavItem active>
                            Home
                        </NavbarNavItem>

                        <NavbarNavItem>
                            About
                        </NavbarNavItem>

                        <NavbarNavItem dropdown>
                            Services
                            <ul className={`${styles.navbar__dropdown_menu} dropdown-menu`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className={`${styles.dropdown_menu_arrow}`} viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                </svg>
                                <li>
                                    <a className="dropdown-item" href="#">Honeymoon Packages</a>
                                </li>
                                <li><a className="dropdown-item" href="#">Tours packages</a></li>
                                <li><a className="dropdown-item" href="#">Musical Events</a></li>
                                <li><a className="dropdown-item" href="#">Build Package</a></li>
                            </ul>
                        </NavbarNavItem>

                        <NavbarNavItem href={"#packages"}> 
                            Upcoming Packages
                        </NavbarNavItem>
                    </ul>
                    
                    <Button value="Get in Touch" mods={clsx(styles.navbar__cta)}/>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;