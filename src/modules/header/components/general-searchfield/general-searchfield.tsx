import { FC } from 'react';
import { SvgSearchIcon } from '../../../../ui/icons';
import styles from './general-searchfield.module.scss';
import { UnderlinedInputWithRightIcon } from '../../../../ui/inputs';

export const GeneralSearchfield: FC = () => {
    const onSearchSubmit = () => {
        console.log('search event fired');
    };

    return (
        <div className={styles.generalSearchfieldWrapper}>
            <UnderlinedInputWithRightIcon
                icon={<SvgSearchIcon />}
                useLabel={false}
                onIconButtonClick={onSearchSubmit}
                placeholder="Search..."
            />
        </div>
    );
};
