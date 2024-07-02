import styles from '../css/page.module.css'
import Card from './Card';
import fs from 'fs';

export default async function MainGrid() {
    const bty = await fs.readFileSync('src/sample.json');
    const strJSON = JSON.parse(bty.toString());
    const series = [];
    const data = strJSON['data'];
    for (const key in data) {
        series.push(data[key])
    }
    const res = series.map(da => {
        //genre_ids  (filted specific tag)
        const t = da.genre_ids.filter(ele => ele != 16);
        const tags = [];
        t.forEach(ele => {
            tags.push({ id: ele, name: strJSON['genre_ids'][ele] })
        });
        return (<Card className={styles.center}
            key={da.id}
            img={da.poster_path}
            title={da.name}
            tag={tags}
        />)
    }
    );

    return (
        <div className={styles.grid}>
            {res}
        </div>
    );
}