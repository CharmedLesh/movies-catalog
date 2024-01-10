import { FC } from 'react';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isPending: boolean;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isPending } = props;

    return (
        <div className={styles.actionButtons}>
            <OutlinedRoundedButton value="Edit" onClick={() => console.log('click')} disabled={isPending} />
            <OutlinedRoundedButton value="Sort By" onClick={() => console.log('click')} disabled={isPending} />
            <OutlinedRoundedButton value="Share" onClick={() => console.log('click')} disabled={isPending} />
        </div>
    );
};
