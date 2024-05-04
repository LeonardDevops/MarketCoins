import styles from "./header.module.css"
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export function Headear() {

    return (
        <header className={styles.container}>
            <Link to="/">
                <img src={logo} alt="Logo cripto App" />
            </Link>
        </header>
    )
}