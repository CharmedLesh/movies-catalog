import { FC } from 'react';
import { AccentOutlinedRoundedButton } from '../../../../ui/buttons/accent-outlined-rounded-button/accent-outlined-rounded-button';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isPending: boolean;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isPending } = props;

    return (
        <div className={styles.actionButtons}>
            <AccentOutlinedRoundedButton value="Edit" onClick={() => console.log('click')} disabled={isPending} />
            <AccentOutlinedRoundedButton value="Sort By" onClick={() => console.log('click')} disabled={isPending} />
            <AccentOutlinedRoundedButton value="Share" onClick={() => console.log('click')} disabled={isPending} />
        </div>
    );
};
