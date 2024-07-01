import Image from 'next/image'
import styles from '../css/page.module.css'

/**
 * 
 * @param {string} img 
 * @param {string} title 
 * @returns 
 */
export default function Card({ img, title }) {
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
            <div>
                <Image className={styles.cardImage}
                    src={`https://img.freepik.com/free-photo/abstract-surface-textures-white-concrete-stone-wall_74190-8189.jpg`}
                    alt="poster"
                    width={100}
                    height={140}
                    loading='lazy'
                />
                <span>
                    <li>genre1</li>
                    <li>genre2</li>
                    <li>genre3</li>
                </span>
            </div>
        </a>
    )
}