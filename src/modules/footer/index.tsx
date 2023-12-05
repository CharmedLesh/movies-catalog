import { FC } from 'react';
import styles from './index.module.scss';

export const FooterModule: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.mediaLinksContainer}>links</div>
            <p className={styles.copyright}>&copy;Copyright text</p>
        </footer>
    );
};
