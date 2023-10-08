import { Link } from "react-router-dom";
import styles from "./button.module.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
function Button(props) {
  const navigate = useNavigate();
  return (
    <Link
      className={clsx(
        styles.btn,
        props.mods,
        "btn btn-primary d-inline-flex align-items-center justify-content-center"
      )}
      to={props.to}
      onClick={() => props.isBackButton && navigate(-1)}
    >
      {props.value}
      {props.children}
    </Link>
  );
}

export default Button;
