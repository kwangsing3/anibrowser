import styles from '../css/page.module.css'
import Card from './Card';
import fs from 'fs';

export default async function MainGrid() {
    const bty = await fs.readFileSync('src/sample.json');
    const data = JSON.parse(bty.toString());
    const series = []
    for (const key in data) {
        series.push(data[key])
    }
    const res = series.map(da =>
        <Card className={styles.center}
            key={da.id}
            img={da.poster_path}
            title={da.name}
        />
    );


    return (
        <div className={styles.grid}>
            {res}
        </div>
    );
}