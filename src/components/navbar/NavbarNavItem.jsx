import styles from "./navbar.module.css";
import PropTypes from "prop-types";
import clsx from 'clsx'
import { useState } from "react";

function NavbarNavItem(props) {
  const [dropdownShow, setDropdownShow] = useState(false);

  function toggleDropdownShow() {
    setDropdownShow(function (prev) {
      return !prev;
    });
  }

  let navItemCls = `${styles.navItem} ${props.dropdown ? "dropdown" : ""} ${
    dropdownShow ? styles.show : ""
  } nav-item rounded-3`;

  let navLinkCls = `${props.active ? styles.active : ""} ${
    styles.navbar__link
  } ${props.dropdown ? "dropdown-toggle" : ""} nav-link p-3 p-mid-0`;

  return (
    <li className={clsx(navItemCls)}>
      <a
        className={clsx(navLinkCls)}
        href={props.href}
        role={props.dropdown ? "button" : null}
        data-bs-toggle={props.dropdown ? "dropdown" : null}
        onClick={props.dropdown ? toggleDropdownShow : null}
        data-bs-auto-close={props.dropdown ? 'false' : null}
      >
        {props.dropdown ? props.children[0] : props.children}
      </a>
      {props.dropdown ? props.children[1] : null}
    </li>
  );
}

NavbarNavItem.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default NavbarNavItem;
