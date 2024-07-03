import styles from '../css/page.module.css'
import Card from './Card';
import fs from 'fs';

export default async function MainGrid() {
    const t = Classificate();
    const series = [];
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


async function Classificate() {
    const bty = await fs.readFileSync('src/sample.json');
    const mainJSON = JSON.parse(bty.toString());
    const series = mainJSON['data'];
    const date = {};
    for (const key in series) {
        const dat = new Date(series[key]['first_air_date']);
        const y = dat.getFullYear();
        const m = dat.getMonth() + 1;
        date[`${y}-${m}`] = date[`${y}-${m}`] === undefined ? [] : date[`${y}-${m}`];
        date[`${y}-${m}`].push(key);
    }
    // 依照日期分類

    console.log();
}