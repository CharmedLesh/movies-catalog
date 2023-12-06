import { FC } from 'react';
import { Copyright } from './components/copyright/copyright';
import { MediaLinks } from './components/media-links/media-links';
import styles from './index.module.scss';

export const FooterModule: FC = () => {
    return (
        <footer className={styles.footer}>
            <MediaLinks />
            <Copyright />
        </footer>
    );
};
