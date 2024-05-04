import { Link } from "react-router-dom";
import styles from "./404.module.css";

export function Notfound() {

    return (
        <div>
            <h1 className="notfound">404...</h1>
            <Link to="/">
                <button className={styles.home}>Home</button>
            </Link>

        </div >
    )
}

