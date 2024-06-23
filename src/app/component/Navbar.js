import Image from "next/image";
import styles from "@/app/css/page.module.css";

export default function Navbar() {
    return (
        <div className={styles.description}>
            <p>
                Get started by editing&nbsp;
                <code className={styles.code}>src/app/page.js</code>
            </p>
        </div>
    );
}