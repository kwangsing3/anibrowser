"use client";
import styles from '../css/page.module.css'
import Button from './Button';
import Card from './Card';
import { useState } from 'react';
import CollapsibleButtons from './CollapsibleButtons';
let year = '2024';
let month = '07';
export default function MainGrid({ data }) {

    const [cards, setArray] = useState([]);
    function handleClick() {
        const tmp = [];
        for (const key in data['data']) {
            const i = data['data'][key]
            const ib = i.first_air_date.includes(
                month === undefined ? `${year}-` : `${year}-${month}-`
            );
            if (ib)
                tmp.push(i);
        }
        tmp.sort((a, b) => { return a.first_air_date > b.first_air_date ? 1 : -1 })
        const res = tmp.map(da => {
            //genre_ids  (filted specific tag)
            const t = da.genre_ids.filter(ele => ele != 16);
            const tags = [];
            t.forEach(ele => {
                tags.push({ id: ele, name: data['genre_ids'][ele] })
            });
            return (<Card
                className={styles.center}
                key={da.id}
                img={da.poster_path}
                title={da.name}
                tag={tags}
                firdate={da.first_air_date}
            />)
        });
        setArray(res);
    }

    const time_list_btns = getYearButton(data['data'], handleClick);
    return (
        // <div style={{ width: "100%" }}>
        //     <div className={"button-container"}>
        //         {time_list_btns}
        //     </div>
        //     <div className={styles.grid}>
        //         {cards}
        //     </div>

        // </div >
        <CollapsibleButtons />
    );
}


function getYearButton(series, oncallback) {
    let odst_dat = new Date();
    for (const key in series) {
        const i = series[key]
        const ib = new Date(i.first_air_date);
        if (ib instanceof Date && !isNaN(ib)) //is invaild Date?
            odst_dat = odst_dat < ib ? odst_dat : ib;
    }
    let t_d = odst_dat;
    const cur_d = new Date();
    let time_list = [];
    while (cur_d > t_d) {
        time_list.push(t_d.getFullYear());
        t_d.setFullYear(t_d.getFullYear() + 1)
    }
    time_list = [...new Set(time_list)].sort((a, b) => { return a < b ? 1 : -1 });
    // Generate Years Buttons
    let counter = 0;
    const res = time_list.map((key) => {
        return (<Button
            key={counter++}
            onClick={() => { year = key; month = undefined; oncallback(); }}
            content={`${key}`}
            className={styles.button}
        />);
    })
    return res
}
