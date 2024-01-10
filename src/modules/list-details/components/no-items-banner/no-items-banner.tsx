import { FC } from 'react';
import { FilledRoundedButton } from '../../../../ui/buttons';
import styles from './no-items-banner.module.scss';

export const NoItemsBanner: FC = () => {
    const actionButtonClickHandler = () => {
        console.log('add item button fired');
    };

    return (
        <div className={styles.wrapper}>
            <p>You haven`t added any items to this list</p>
            <FilledRoundedButton value="ADD ITEM" onClick={actionButtonClickHandler} />
        </div>
    );
};
