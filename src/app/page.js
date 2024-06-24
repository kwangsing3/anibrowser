import Image from "next/image";
import styles from './css/page.module.css';
import MainGrid from "./component/MainGrid";
import Navbar from "./component/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>

      <Navbar />

      <div className={styles.center}>
        --
      </div>

      <MainGrid />

    </main>
  );
}
