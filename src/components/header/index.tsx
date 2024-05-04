import styles from "./header.module.css"
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

export function Headear() {

    return (
        <header className={styles.container}>
            <Link to="/">
                <div className={styles.containerLogo}>
                    <img src={logo} alt="logo-moedas" />
                    <h1 className={styles.market}>Market<span className={styles.mcoins}>Coins</span></h1>
                    <img className={styles.logoh} src={logo} alt="logo-moedas" />
                </div>
            </Link>
        </header >
    )
}