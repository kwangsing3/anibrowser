"use client";
import styles from '../css/page.module.css'
import Button from './Button';
import Card from './Card';
import { useState } from 'react';

export default function MainGrid({ data }) {
    let year = '2024';
    let month = '07';
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
    return (
        <div style={{ width: "100%" }}>
            <div >
                <Button
                    onClick={() => { year = '2017'; month = undefined; handleClick(); }}
                    content="2017"
                />
                <Button
                    onClick={() => { year = '2018'; month = undefined; handleClick(); }}
                    content="2018"
                />
                <Button
                    onClick={() => { year = '2019'; month = undefined; handleClick(); }}
                    content="2019"
                />
                <Button
                    onClick={() => { year = '2020'; month = undefined; handleClick(); }}
                    content="2020"
                />
                <Button
                    onClick={() => { year = '2021'; month = undefined; handleClick(); }}
                    content="2021"
                />
                <Button
                    onClick={() => { year = '2022'; month = undefined; handleClick(); }}
                    content="2022"
                />
                <Button
                    onClick={() => { year = '2023'; month = undefined; handleClick(); }}
                    content="2023"
                />
                <Button
                    onClick={() => { year = '2024'; month = undefined; handleClick(); }}
                    content="2024"
                />
                <Button
                    onClick={() => { year = '2024'; month = '04'; handleClick(); }}
                    content="2024-04" />
                <Button
                    onClick={() => { year = '2024'; month = '07'; handleClick(); }}
                    content="2024-07"
                />

            </div>
            <div className={styles.grid}>
                {cards}
            </div>
        </div >
    );
}


