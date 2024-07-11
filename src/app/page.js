
import styles from './css/page.module.css';
import MainGrid from "./component/MainGrid";
import Navbar from "./component/Navbar";
import fs from 'fs';

export default async function Home() {
  const bty = await fs.readFileSync('src/sample.json');
  const mainJSON = JSON.parse(bty.toString());
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.center}>
        --
      </div>

      <MainGrid
        data={mainJSON}
      />

    </main>
  );
}
