import React from "react";
import clsx from 'clsx'
//
import styles from './styles.module.css'
import Logo from "../ui_components/logo/Logo.jsx";
import Row from "../ui_components/wrappers/Row.jsx";
import Col from "../ui_components/wrappers/Col.jsx";
import Button from "../ui_components/buttons/Button.jsx";
import Content from "../ui_components/wrappers/Content.jsx";
//

function AdminNavbar({ backButtonText, subTitle, showLogo, goseTo }) {

  return (
    <nav className={clsx(styles.nav, "navbar navbar-expand-lg")}>
      <Content>
        <Row mods="align-items-center p-5">
          <Col mods={"col-4"}>
            <Button to={goseTo}>
              <i className="bi bi-arrow-left-short fs-3 icon-left me-3"></i>
              {backButtonText}
            </Button>
          </Col>
          <Col mods="col-4 text-center">
            <h2 className="mb-0 fw-medium">
              {showLogo && <Logo dark mods="me-7" />}
              {subTitle}
            </h2>
          </Col>
        </Row>
      </Content>
    </nav>
  );
}

export default AdminNavbar;
