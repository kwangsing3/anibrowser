import Image from 'next/image'
import styles from '../css/page.module.css'

/**
 * 
 * @param {string} img 
 * @param {string} title 
 * @param {Array<string>} tag
 * @param {string} firdate
 * @returns 
 */
export default function Card({ img, title, tag, firdate }) {
    let c = 0;
    let genre = tag.map((key) =>
        <li key={c++}>{key.name}</li>
    )
    return (
        <a
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div>
                <h3>
                    【{"----"}】
                </h3>
            </div>
            <div className={styles.cardcontent}>
                <Image className={styles.cardImage}
                    src={'https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg'}
                    alt="poster"
                    width={100}
                    height={140}
                    loading='lazy'
                />
                <span>
                    {genre}
                </span>
            </div>
            <div>
                <h3>
                    {firdate}
                </h3>
            </div>
        </a>
    )
}