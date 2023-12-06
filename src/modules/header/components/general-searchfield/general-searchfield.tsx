import { SvgSearchIcon } from '../../../../ui/icons';
import styles from './general-searchfield.module.scss';

export const GeneralSearchfield = () => {
    return (
        <div className={styles.generalSearchfieldWrapper}>
            <input className={styles.generalSearchfield} placeholder="Search for..." />
            <button className={styles.searchButton}>
                <SvgSearchIcon className={styles.searchIcon} />
            </button>
        </div>
    );
};
