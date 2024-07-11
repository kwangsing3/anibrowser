import styles from '../css/page.module.css'

export default function Button({ onClick, content }) {
    return (
        <button
            onClick={onClick}
            className={styles.button}
        >
            {content}
        </button>
    );
}