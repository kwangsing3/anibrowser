import React, { useState } from 'react';
import styles from '../css/page.module.css'
const CollapsibleButtons = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <button className={styles.button} onClick={toggleExpand}>
                {isExpanded ? '摺疊' : '展開'}
            </button>
            <div className={`${styles.buttonContainer}  ${isExpanded ? styles.expanded : styles.collapsed}`}>
                <button className={styles.btn}>按鈕 1</button>
                <button className={styles.btn}>按鈕 2</button>
                <button className={styles.btn}>按鈕 3</button>
                <button className={styles.btn}>按鈕 4</button>
                <button className={styles.btn}>按鈕 5</button>
            </div>

        </div>
    );
};

export default CollapsibleButtons;
