import Image from "next/image";
import styles from "@/app/css/page.module.css";
import MainGrid from "./component/MainGrid";
import Navbar from "./component/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>

      <Navbar />

      <div className={styles.center}>
        中間畫面
      </div>

      <MainGrid />

    </main>
  );
}
