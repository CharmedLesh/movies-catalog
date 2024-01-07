import { FC } from 'react';
import { AccentFilledRoundedButton } from '../../../../ui/buttons';
import styles from './no-items-banner.module.scss';

export const NoItemsBanner: FC = () => {
    const actionButtonClickHandler = () => {
        console.log('add item button fired');
    };

    return (
        <div className={styles.wrapper}>
            <p>You haven`t added any items to this list</p>
            <AccentFilledRoundedButton value="ADD ITEM" onClick={actionButtonClickHandler} />
        </div>
    );
};
